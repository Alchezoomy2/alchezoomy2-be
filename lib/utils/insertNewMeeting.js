const client = require('../client.js');

module.exports = async (meetingObj, teacherId) => {
    console.log('--------inside----------')
    console.log(meetingObj);
    // console.log('--------inside----------')

    // console.log(teacherId)
    console.log(teacherId);
    console.log(meetingObj.host_id);
    console.log(meetingObj.account_id);
    console.log(meetingObj.user_name);
    console.log(meetingObj.pic_url);
    console.log(meetingObj.topic);
    console.log(meetingObj.start_time);
    console.log(typeof meetingObj.duration);
    console.log(meetingObj.share_url);
    console.log(meetingObj.video_download_url);
    console.log(meetingObj.audio_download_url);
    console.log(meetingObj.transcript_download_url);
    console.log(meetingObj.chat_download_url);

    console.log('--------inside----------');

    const returnedObject = await client.query(`
        INSERT INTO meetings
        (teacher_id, host_id, account_id, user_name, pic_url, topic, start_time, duration, share_url, video_url, audio_url, transcript_url, chat_url, meeting_views, meeting_favs)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *`,
        [
            teacherId,
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
    console.log('inserted!');
    console.log(returnedObject.rows);
    return returnedObject;
}