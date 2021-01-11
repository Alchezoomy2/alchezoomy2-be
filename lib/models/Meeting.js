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
    teacher_id;
    host_id;
    account_id;
    user_name;
    pic_url;
    color;
    topic;
    display_time;
    start_time;
    duration;
    share_url;
    video_url;
    audio_url;
    transcript_url;
    chat_url;
    meeting_views;
    meeting_favs;

    constructor(row) {
        this.id = row.id;
        this.published = row.published;
        this.teacher_id = row.teacher_id;
        this.host_id = row.host_id;
        this.account_id = row.account_id;
        this.user_name = row.user_name;
        this.pic_url = row.pic_url;
        this.color = row.color;
        this.topic = row.topic;
        this.display_time = row.display_time;
        this.start_time = row.start_time;
        this.duration = row.duration;
        this.share_url = row.share_url;
        this.video_url = row.video_url;
        this.audio_url = row.audio_url;
        this.transcript_url = row.transcript_url;
        this.chat_url = row.chat_url;
        this.meeting_views = row.meeting_views;
        this.meeting_favs = row.meeting_favs;
    }

    static async retrieveFromZoom(teacherInfo) {
        let returnedMeetingObject;

        if (teacherInfo.last_update === teacherInfo.account_created) {
            returnedMeetingObject = await fetch
                .get(`${zoomUrl}users/me/recordings?from=2020-10-01`)
                .set('Authorization', 'Bearer ' + teacherInfo.access_token);

        } else {
            returnedMeetingObject = await fetch
                .get(`${zoomUrl}users/me/recordings?from=${teacherInfo.last_update.slice(0, 10)}`)
                .set('Authorization', 'Bearer ' + teacherInfo.access_token);
        }

        return returnedMeetingObject.body;
    }

    static async loadNewMeetings(newMeetingArray, teacherInfo) {

        const oldMeetingArray = await this.findAll(teacherInfo.teacherId);


        for (let newMeeting of newMeetingArray) {
            let isNew = true;

            for (let oldMeeting of oldMeetingArray) {
                if (oldMeeting.start_time === newMeeting.start_time) isNew = false;
            }
            if (isNew) {
                let meetingObj = await parseMeetingObj(newMeeting, teacherInfo);

                await this.insert(meetingObj, teacherInfo.teacherId);

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
            meeting_favs
            )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING id`,
            [
                teacherId,
                false,
                meetingObj.host_id,
                meetingObj.account_id,
                meetingObj.user_name,
                meetingObj.pic_url,
                meetingObj.topic,
                meetingObj.start_time,
                meetingObj.display_time,
                meetingObj.duration,
                meetingObj.share_url,
                meetingObj.video_url,
                meetingObj.audio_url,
                meetingObj.transcript_url,
                meetingObj.chat_url,
                0,
                0,
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
            await sendToS3(videoPath, meetingObj.video_url, accessToken);
        }

        if (meetingObj.chat_url) {
            await insertNewChat(meetingObj, meetingId, accessToken);
        }

        if (meetingObj.transcript_url) {
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
}
