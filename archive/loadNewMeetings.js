const insertNewMeeting = require('./insertNewMeeting.js');
const loadMeetingObj = require('./parseMeetingObj.js');
const retrieveAllMeetings = require('./retrieveAllMeetings.js');

module.exports = async (meetingsObj, teacherInfo, teacherId) => {

    let arrayOfMeetings = [];
    const completeMeetingList = await retrieveAllMeetings(teacherId);


    for (let newMeeting of meetingsObj.meetings) {
        let isNew = true;

        for (let oldMeeting of completeMeetingList) {
            if (oldMeeting.start_time === newMeeting.start_time) isNew = false;
        }
        if (isNew) {
            let meetingObj = await loadMeetingObj(newMeeting, teacherInfo);

            const meetingId = await insertNewMeeting(meetingObj, teacherId);

            meetingObj.id = meetingId;
            arrayOfMeetings.push(meetingObj);
        }
    }

    return arrayOfMeetings;
}


