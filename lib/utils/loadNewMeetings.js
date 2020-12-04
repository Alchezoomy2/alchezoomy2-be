const insertNewMeeting = require('./insertNewMeeting.js');
const loadMeetingObj = require('./loadMeetingObj.js');
const retrieveAllMeetings = require('./retrieveAllMeetings.js');

module.exports = async (meetingsObj, teacherInfo, teacherId) => {

    let arrayOfMeetings = [];
    const completeMeetingList = await retrieveAllMeetings(teacherObj.id);


    for (let meeting of meetingsObj.meetings) {
        let isNew = true;

        for (let oldMeeting of completeMeetingList) {
            if (oldMeeting.start_time === meeting.start_time) isNew = false;
        }
        if (isNew) {
            let meetingObj = await loadMeetingObj(meeting, teacherInfo);

            const meetingId = await insertNewMeeting(meetingObj, teacherId);

            meetingObj.id = meetingId;
            arrayOfMeetings.push(meetingObj);
        }
    }

    return arrayOfMeetings;
}


