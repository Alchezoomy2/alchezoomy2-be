const insertNewMeeting = require('./insertNewMeeting.js');
const loadMeetingObj = require('./loadMeetingObj.js');

module.exports = async (meetingsObj, teacherInfo, teacherId) => {

    let arrayOfMeetings = [];

    for (let meeting of meetingsObj.meetings) {

        let meetingObj = await loadMeetingObj(meeting, teacherInfo);

        const meetingId = insertNewMeeting(meetingObj, teacherInfo);

        meetingObj.id = meetingId;
        arrayOfMeetings.push(meetingObj);

    }

    return arrayOfMeetings;
}


