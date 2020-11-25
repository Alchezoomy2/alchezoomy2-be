const client = require('../client.js');

module.exports = async (meetingObj, teacherId) => {
    console.log('--------inside----------')
    console.log(meetingObj);
    console.log('--------inside----------')

    console.log(teacherId)
    console.log('--------inside----------')

    return client.query(
        `INSERT INTO meetings
        (teacher_id, host_id, user_name, pic_url, color, topic, start_time, duration, share_url, video_play_url, audio_play_url, transcript_url, chat_url, meeting_views, meeting_favs)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING * `,
        [
            teacherId,
            meetingObj.host_id,
            meetingObj.user_name,
            meetingObj.pic_url,
            meetingObj.color,
            meetingObj.topic,
            meetingObj.start_time,
            meetingObj.duration,
            meetingObj.share_url,
            meetingObj.video_play_url,
            meetingObj.audio_play_url,
            meetingObj.transcript_url,
            meetingObj.chat_url,
            0,
            0
        ]
    )


}