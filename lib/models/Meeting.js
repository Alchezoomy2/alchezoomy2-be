const client = require('../client.js');
const parseMeetingObj = require('../utils/parseMeetingObj.js');
const sendToS3 = require('../utils/sendToS3.js');
const deleteFromS3 = require('../utils//deleteFromS3.js');
const insertNewTranscript = require('../utils/insertNewTranscript.js');
const insertNewChat = require('../utils/insertNewChat');
const fetch = require('superagent');
const { region, Bucket } = require('../../config.json')

const zoomUrl = process.env.ZOOM_URL

module.exports = class Meeting {
    id;
    published;
    teacherId;
    userName;
    picUrl;
    color;
    topic;
    displayTime;
    startTime;
    duration;
    shareUrl;
    videoUrl;
    audioUrl;
    transcriptUrl;
    chatUrl;
    meetingViews;
    meetingFavs;
    onZoom;

    constructor(row) {
        this.id = row.id;
        this.published = row.published;
        this.teacherId = row.teacher_id;
        this.userName = row.user_name;
        this.picUrl = row.pic_url;
        this.color = row.color;
        this.topic = row.topic;
        this.displayTime = row.display_time;
        this.startTime = row.start_time;
        this.duration = row.duration;
        this.shareUrl = row.share_url;
        this.videoUrl = row.video_url;
        this.audioUrl = row.audio_url;
        this.transcriptUrl = row.transcript_url;
        this.chatUrl = row.chat_url;
        this.meetingViews = row.meeting_views;
        this.meetingFavs = row.meeting_favs;
        this.onZoom = row.on_zoom;
    }

    static async retrieveFromZoom(teacherInfo, access_token) {
        let returnedMeetingObject;

        if (teacherInfo.lastUpdate === teacherInfo.accountCreated) {
            returnedMeetingObject = await fetch
                .get(`${zoomUrl}users/me/recordings?from=2020-10-01`)
                .set('Authorization', 'Bearer ' + access_token);
        } else {
            returnedMeetingObject = await fetch
                .get(`${zoomUrl}users/me/recordings?from=${teacherInfo.lastUpdate.slice(0, 10)}`)
                .set('Authorization', 'Bearer ' + access_token);
        }

        return returnedMeetingObject.body;
    }

    static async loadNewMeetings(newMeetingArray, teacherInfo) {

        const oldMeetingArray = await this.findAll(teacherInfo.id);
        for (let newMeeting of newMeetingArray) {
            let isNew = true;

            const existingMeeting = oldMeetingArray.find(oldMeeting => oldMeeting.startTime === newMeeting.start_time)

            if (existingMeeting) {
                isNew = false;
                if (existingMeeting.topic !== newMeeting.topic || existingMeeting.duration !== newMeeting.duration) {
                    const updatedMeeting = await parseMeetingObj(newMeeting, teacherInfo);
                    await this.updateLocally(oldMeeting.id, updatedMeeting)
                }
            }

            if (isNew) {
                let meetingObj = await parseMeetingObj(newMeeting, teacherInfo);

                await this.insert(meetingObj, teacherInfo.id);
            }
        }
    }

    static async insert(meetingObj, teacherId) {
        const { rows } = await client.query(`
        INSERT INTO meetings
        (
            teacher_id, 
            published, 
            topic, 
            start_time, 
            display_time,
            duration, 
            share_url, 
            video_url, 
            audio_url, 
            transcript_url, 
            chat_url, 
            meeting_views, 
            meeting_favs,
            zoom_meeting_id,
            on_zoom
            )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING id`,
            [
                teacherId,
                meetingObj.published,
                meetingObj.topic,
                meetingObj.startTime,
                meetingObj.displayTime,
                meetingObj.duration,
                meetingObj.shareUrl,
                meetingObj.videoUrl,
                meetingObj.audioUrl,
                meetingObj.transcriptUrl,
                meetingObj.chatUrl,
                meetingObj.meetingViews,
                meetingObj.meetingFavs,
                meetingObj.zoomMeetingId,
                true
            ]
        );

        return new Meeting(rows)
    }

    static async checkOnZoom(teacherId, access_token) {

        oldMeetingArray = await this.findAll(teacherId);
        try {
            for (let meeting of oldMeetingArray) {
                if (meeting.onZoom) {
                    meetingId = await this.fetchZoomMeetingId(meeting.id);

                    const { status } = await fetch
                        .get(`${zoomUrl}meetings/${meetingId}/recordings`)
                        .set('Authorization', 'Bearer ' + access_token)

                    console.log(status)
                    if (status === 404) this.notOnZoom(meeting.id)
                }


            }
        } catch (error) {
            console.log(error.message)
            throw (error)
        }
    }

    static async findAll(teacherId) {
        const { rows } = await client.query(`
        SELECT 
        meetings.*,
        teachers.user_name,
        teachers.pic_url,
        teachers.color
        FROM meetings
        LEFT JOIN teachers
            ON meetings.teacher_id = teachers.id
        WHERE meetings.teacher_id = $1
        ORDER BY start_time DESC`,
            [teacherId]);

        return rows.map(row => { return new Meeting(row) })

    }

    static async publish(meetingId, accessToken) {


        const returnedMeetingObj = await client.query(`
        UPDATE meetings
        SET published = true
        WHERE id = $1
        RETURNING *`,
            [meetingId]);

        const meetingObj = returnedMeetingObj.rows[0];
        if (meetingObj.video_url) {
            const fileName = new Date(meetingObj.start_time).valueOf() / 1000;
            const videoPath = `videos/${meetingObj.teacher_id}/${fileName}.mp4`;
            await sendToS3(videoPath, meetingObj.video_url, accessToken);

            await client.query(`
            UPDATE meetings
            SET media_url = $2
            WHERE id = $1`,
                [meetingId, `https://${Bucket}.s3-${region}.amazonaws.com/${videoPath}`])

        } else if (meetingObj.audio_url) {
            const audioPath = `videos / ${meetingObj.teacher_id} / ${meetingObj.id}.m4a`;
            await sendToS3(audioPath, meetingsObj.audio_url, accessToken)
        }

        if (meetingObj.chat_url) {
            await insertNewChat(meetingObj, meetingId, accessToken);
        }

        if (meetingObj.transcript_url) {
            await insertNewTranscript(meetingObj, accessToken);
        }

        return new Meeting(meetingObj)
    }

    static async unpublish(meetingId) {
        const returnedMeetingObj = await client.query(`
        UPDATE meetings
        SET published = false
        WHERE id = $1
        RETURNING *
                    `, [meetingId]);

        const meetingObj = returnedMeetingObj.rows[0];

        await client.query(`
        DELETE from chats
        WHERE meeting_id = $1
        RETURNING * `,
            [meetingId]);

        await client.query(`
        DELETE from transcripts
        WHERE meeting_id = $1
        RETURNING * `,
            [meetingId]);

        const videoPath = `videos / ${meetingObj.teacher_id} / ${meetingObj.id}.mp4`;
        await deleteFromS3(videoPath);

        return new Meeting(meetingObj);
    }

    static async findById(meetingId) {

        const meetingObj = await client.query(`
        SELECT *
                    FROM meetings
        WHERE id = $1
                        `, [meetingId])

        const chatArray = await client.query(`
        SELECT *
                    FROM chats
        WHERE meeting_id = $1
        ORDER BY id
                        `, [meetingId]);

        const transcriptArray = await client.query(`
        SELECT *
                    FROM transcripts
        WHERE meeting_id = $1
        ORDER BY id
                        `, [meetingId]);

        return {
            meeting: meetingObj.rows[0],
            chat: chatArray.rows,
            transcript: transcriptArray.rows
        }
    }

    static async addView(meetingId) {
        await client.query(`
        UPDATE meetings
        SET meeting_views = meeting_views + 1
        WHERE id = $1`,
            [meetingId])
    }

    static async updateLocally(meetingId, meetingObj) {

        const { rows } = await client.query(`
        UPDATE meetings SET 
            topic = $1,
            video_url = $2,
            chat_url = $3,
            transcript_url = $4
        WHERE id = $5
        RETURNING *`,
            [
                meetingObj.topic,
                meetingObj.videoUrl,
                meetingObj.chatUrl,
                meetingObj.transcriptUrl,
                meetingId
            ])

        return new Meeting(rows[0]);
    }

    static async fetchZoomMeetingId(meetingId) {

        const { rows } = await client.query(`
        SELECT zoom_meeting_id
        FROM meetings
        WHERE id = $1`,
            [meetingId])

        return rows[0].zoom_meeting_id;
    }

    static async refreshMeetingInfo(meetingId, meetingObj) {

        await client.query(`
        UPDATE meetings 
            SET
            topic = $1,
            start_time = $2,
            display_time = $3,
            duration = $4,
            transcript_url = $5,
            video_url = $6,
            audio_url = $7,
            chat_url = $8
        WHERE id = $9
        `, [
            meetingObj.topic,
            meetingObj.startTime,
            meetingObj.displayTime,
            meetingObj.duration,
            meetingObj.transcriptUrl,
            meetingObj.videoUrl,
            meetingObj.audioUrl,
            meetingObj.chatUrl,
            meetingId
        ])
    }

    static async notOnZoom(meetingId) {

        await client.query(`
        UPDATE meetings
            SET on_zoom = false
        WHERE id = $1
        `, [meetingId])
    }
}


