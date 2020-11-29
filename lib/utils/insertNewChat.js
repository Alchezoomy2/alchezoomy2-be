const client = require('../client.js');
const nfetch = require('node-fetch');
const format = require('pg-format');



module.exports = async (meetingObj, teacherId, meetingId) => {

    console.log('insertNewChat.js');


    const chatFile = await nfetch(meetingObj.chat_download_url);
    const text = await chatFile.text();
    const firstParse = text.split('\r\n');

    const arrayOfChats = [];
    for (let line of firstParse) {
        const tempArray = line.split('\t');
        arrayOfChats.push([
            teacherId,
            meetingId,
            tempArray[0] || '',
            tempArray[1] || '',
            tempArray[2] || '',
        ]);
    };

    const chatQuery = format('INSERT INTO chats (meeting_id, teacher_id, timestamp, speaker, text) VALUES %L returning id', arrayOfChats);

    const returnedObject = await client.query(chatQuery);

    return returnedObject;



}