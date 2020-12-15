let tz = require('timezone/loaded');


module.exports = async (meeting, user_info) => {

    let video_download_url = '';
    let audio_download_url = '';
    let transcript_download_url = '';
    let chat_download_url = '';

    for (let recording_file of meeting.recording_files) {

        if (recording_file.recording_type === 'audio_transcript') {
            transcript_download_url = `${recording_file.download_url}?access_token=${user_info.access_token}`;

        } else if (recording_file.file_type === 'MP4') {
            video_download_url = `${recording_file.download_url}?access_token=${user_info.access_token}`;

        } else if (recording_file.recording_type === 'audio_only') {
            audio_download_url = `${recording_file.download_url}?access_token=${user_info.access_token}`;

        } else if (recording_file.recording_type === 'chat_file') {
            chat_download_url = `${recording_file.download_url}?access_token=${user_info.access_token}`;
        }
    }

    let display_time = tz(meeting.start_time, '%c', 'en_EN', user_info.timezone)


    const meetingObj = {
        published: false,
        user_name: user_info.user_name,
        email: user_info.email,
        pic_url: user_info.pic_url,
        host_id: meeting.host_id,
        account_id: user_info.account_id,
        topic: meeting.topic,
        start_time: meeting.start_time,
        display_time,
        share_url: meeting.share_url,
        duration: meeting.duration,
        transcript_url: transcript_download_url,
        video_url: video_download_url,
        audio_url: audio_download_url,
        chat_url: chat_download_url,
        meeting_views: 0,
        meeting_favs: 0
    };

    return meetingObj;
}