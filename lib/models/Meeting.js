const client = require('../client.js');
const parseMeetingObj = require('../utils/parseMeetingObj.js');
const sendToS3 = require('../utils/sendToS3.js');
const deleteFromS3 = require('../utils//deleteFromS3.js');
const insertNewTranscript = require('../utils/insertNewTranscript.js');
const insertNewChat = require('../utils/insertNewChat');
const fetch = require('superagent');

const zoomUrl = process.env.ZOOM_URL

module.exports = class Meeting {
    id;
    published;
    teacherId;
    hostId;
    accountId;
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
    ZoomMeetingId;

    constructor(row) {
        this.id = row.id;
        this.published = row.published;
        this.teacherId = row.teacher_id;
        this.hostId = row.host_id;
        this.accountId = row.account_id;
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
        this.ZoomMeetingId = row.zoom_meeting_id;
    }

    static async retrieveFromZoom(teacherInfo, access_token) {
        let returnedMeetingObject;

        if (teacherInfo.lastUpdate === teacherInfo.accountCreated) {
            returnedMeetingObject = await fetch
                .get(`${zoomUrl}users/me/recordings?from=2020-10-01`)
                .set('Authorization', 'Bearer ' + access_token);
        } else {
            returnedMeetingObject = await fetch
                .get(`${zoomUrl}users/me/recordings?from=${teacherInfo.last_update.slice(0, 10)}`)
                .set('Authorization', 'Bearer ' + access_token);
        }

        return returnedMeetingObject.body;
    }

    static async loadNewMeetings(newMeetingArray, teacherInfo) {
        console.log(newMeetingArray)

        const oldMeetingArray = await this.findAll(teacherInfo.id);
        for (let newMeeting of newMeetingArray) {
            let isNew = true;

            for (let oldMeeting of oldMeetingArray) {
                if (oldMeeting.startTime === newMeeting.start_time) isNew = false;
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
            host_id, 
            account_id, 
            user_name, 
            pic_url, 
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
            color,
            zoom_meeting_id
            )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        RETURNING id`,
            [
                teacherId,
                false,
                meetingObj.hostId,
                meetingObj.accountId,
                meetingObj.userName,
                meetingObj.picUrl,
                meetingObj.topic,
                meetingObj.startTime,
                meetingObj.displayTime,
                meetingObj.duration,
                meetingObj.shareUrl,
                meetingObj.videoUrl,
                meetingObj.audioUrl,
                meetingObj.transcriptUrl,
                meetingObj.chatUrl,
                0,
                0,
                meetingObj.color,
                meetingObj.ZoomMeetingId
            ]
        );

        return new Meeting(rows)
    }

    static async findAll(teacherId) {
        const { rows } = await client.query(`
        SELECT *
        FROM meetings
        WHERE teacher_id = $1
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
            const videoPath = `videos/${meetingObj.teacher_id}/${meetingObj.id}.mp4`;
            console.log(videoPath)
            await sendToS3(videoPath, meetingObj.video_url, accessToken);
        }

        if (meetingObj.chat_url) {
            console.log('chat_url')
            await insertNewChat(meetingObj, meetingId, accessToken);
        }

        if (meetingObj.transcript_url) {
            console.log('transcript_url')
            await insertNewTranscript(meetingObj, meetingId, accessToken);
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
        RETURNING *`,
            [meetingId]);

        await client.query(`
        DELETE from transcripts
        WHERE meeting_id = $1
        RETURNING *`,
            [meetingId]);

        const videoPath = `videos/${meetingObj.teacher_id}/${meetingObj.id}.mp4`;
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

    static async update(meetingId, meetingObj) {
        const { rows } = await client.query(`
        UPDATE meetings
        SET topic = $1
        WHERE id = $2
        RETURNING *
        `, [meetingId, meetingObj.topic])

        return new Meeting(rows[0]);
    }

}


