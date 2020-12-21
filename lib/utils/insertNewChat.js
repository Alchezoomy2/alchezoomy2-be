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
        if (tempArray[0])
            arrayOfChats.push([
                meetingObj.teacher_id,
                meetingId,
                tempArray[0] || '',
                tempArray[1] || '',
                tempArray[2] || '',
            ]);
    };


    const chatQuery = format('INSERT INTO chats (meeting_id, teacher_id, timestamp, speaker, text) VALUES %L returning *', arrayOfChats);
    console.log(chatQuery);
    const returnedObject = await client.query(chatQuery);

    return returnedObject;



}