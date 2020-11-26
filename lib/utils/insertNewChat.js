const client = require('../client.js');
const nfetch = require('node-fetch');
const fetch = require('superagent');
const format = require('pg-format');



module.exports = async (meetingObj, teacherId, meetingId) => {

    // console.log(meetingObj);

    const chatFile = await nfetch(meetingObj.chat_download_url);
    const text = await chatFile.text();
    console.log(text);
    const firstParse = text.split('\r\n');

    const secondParse = [];
    for (let line of firstParse) {
        const tempArray = line.split('\t');
        secondParse.push({
            teacher_id: teacherId,
            meeting_id: meetingId,
            timestamp: tempArray[0] || '',
            speaker: tempArray[1] || '',
            text: tempArray[2] || '',
        });
    };

    console.log(secondParse);

    const chatQuery = format('INSERT INTO chats (meeting_id, teacher_id, timestamp, speaker, text) VALUES %L returning id', secondParse);

    const returnedObject = await client.query(chatQuery);

    console.log(returnedObject);

    return returnedObject;



}