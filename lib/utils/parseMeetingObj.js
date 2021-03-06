let tz = require('timezone/loaded');


module.exports = async (meeting, user_info) => {
    let video_download_url = '';
    let audio_download_url = '';
    let transcript_download_url = '';
    let chat_download_url = '';

    for (let recording_file of meeting.recording_files) {

        if (recording_file.file_type === 'MP4') {
            video_download_url = `${recording_file.download_url}?access_token=`;

        } else if (recording_file.recording_type === 'audio_only') {
            audio_download_url = `${recording_file.download_url}?access_token=`;

        } else if (recording_file.recording_type === 'chat_file') {
            chat_download_url = `${recording_file.download_url}?access_token=`;

        } else if (recording_file.recording_type === 'audio_transcript') {
            transcript_download_url = `${recording_file.download_url}?access_token=`;
        }
    }

    let displayTime = tz(meeting.start_time, '%c', 'en_EN', user_info.timezone)


    const meetingObj = {
        teacherId: user_info.id,
        published: false,
        topic: meeting.topic,
        startTime: meeting.start_time,
        displayTime,
        shareUrl: meeting.share_url,
        duration: meeting.duration,
        transcriptUrl: transcript_download_url,
        videoUrl: video_download_url,
        audioUrl: audio_download_url,
        chatUrl: chat_download_url,
        meetingViews: 0,
        meetingFavs: 0,
        zoomMeetingId: meeting.id
    };

    return meetingObj;
}
