const client = require('../client.js');
const nfetch = require('node-fetch');
const format = require('pg-format');



module.exports = async (meetingObj, meetingId, accessToken) => {

    const chatFile = await nfetch(meetingObj.chat_url + accessToken);

    const text = await chatFile.text();
    const firstParse = text.split('\r\n');


    const arrayOfChats = [];
    for (let line of firstParse) {
        const tempArray = line.split('\t');

        const timestampArray = tempArray[0].split(':')
        const parsedTimestamp = (parseInt(timestampArray[0]) * 3600) + (parseInt(timestampArray[1]) * 60) + (parseInt(timestampArray[2]))
        console.log(parsedTimestamp)

        if (tempArray[0]) {

            arrayOfChats.push([
                meetingObj.teacher_id,
                meetingId,
                tempArray[0] || '',
                parsedTimestamp,
                tempArray[1] || '',
                tempArray[2] || '',
            ])
        };
    };


    const chatQuery = format('INSERT INTO chats (teacher_id, meeting_id, timestamp, parsed_timestamp, speaker, text) VALUES %L returning *', arrayOfChats);

    const returnedObject = await client.query(chatQuery);

    return returnedObject;

}
