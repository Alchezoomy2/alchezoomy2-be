const client = require("../client");
const loadMeetingObj = requre('./loadMeetingObj.js');

/* eslint-disable indent */
module.exports = async (meetingsObj, user_info) => {

    let arrayOfMeetings = [];

    // pulls existing published videos from database
    const publishedMeetings = client.query(`
    SELECT *
    FROM meetings
    WHERE meetings.host_id = $1`,
        [user_info.host_id]);

    // iterate through list of meetings from ZOOM API
    for (let meeting of meetingsObj.meetings) {

        let meetingObj;

        // if user has published meetings
        if (publishedMeetings.rows != []) {
            // iterate through published meetings
            for (let publishedMeeting of publishedMeetings.rows) {
                // if current meeting has the same start time as published meeting
                // take meeting data from published meeting, and mark it as published
                if (meeting.start_time === publishedMeeting.start_time) {
                    meetingObj = publishedMeeting;
                    meetingObj.published = true;
                    // if current meeting is not published, load meeting data
                } else {
                    meetingObj = loadMeetingObj(meeting, user_info);
                }
                // add parsed meeting to array of meetings to return
                arrayOfMeetings.push(meetingObj);
            }
            // if user has no published meetings
        } else {
            // parse all meetings and add them to array of meetings
            meetingObj = loadMeetingObj(meeting, user_info);
            arrayOfMeetings.push(meetingObj);
        }
    }

    console.log(arrayOfMeetings);

    return arrayOfMeetings;
}
