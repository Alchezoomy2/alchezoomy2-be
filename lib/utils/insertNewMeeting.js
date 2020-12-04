const client = require('../client.js');

module.exports = async (meetingObj, teacherId) => {
    console.log('inside insertNewMeeting')

    const returnedObject = await client.query(`
    BEGIN
        IF NOT EXISTS (SELECT * FROM meetings
                        WHERE start_time = $8);
        BEGIN
        INSERT INTO meetings
        (teacher_id, published, host_id, account_id, user_name, pic_url, topic, start_time, duration, share_url, video_url, audio_url, transcript_url, chat_url, meeting_views, meeting_favs)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *
        END
    END`,
        [
            teacherId,
            false,
            meetingObj.host_id,
            meetingObj.account_id,
            meetingObj.user_name,
            meetingObj.pic_url,
            meetingObj.topic,
            meetingObj.start_time,
            meetingObj.duration,
            meetingObj.share_url,
            meetingObj.video_download_url,
            meetingObj.audio_download_url,
            meetingObj.transcript_download_url,
            meetingObj.chat_download_url,
            0,
            0,
        ]);

    return returnedObject.rows[0];
}