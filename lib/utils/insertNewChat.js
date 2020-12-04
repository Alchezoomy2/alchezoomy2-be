const client = require('../client.js');
const nfetch = require('node-fetch');
const format = require('pg-format');



module.exports = async (meetingObj, meetingId) => {

    // console.log('insertNewChat.js')
    // console.log(meetingObj.chat_url)
    const chatFile = await nfetch(meetingObj.chat_url);
    console.log('after fetch')
    const text = await chatFile.text();
    const firstParse = text.split('\r\n');


    const arrayOfChats = [];
    for (let line of firstParse) {
        const tempArray = line.split('\t');
        arrayOfChats.push([
            meetingObj.teacher_id,
            meetingId,
            tempArray[0] || '',
            tempArray[1] || '',
            tempArray[2] || '',
        ]);
    };

    console.log('------------------------------------');
    console.log('arrayOfChats:');
    console.log(arrayOfChats)
    console.log('------------------------------------');

    const chatQuery = format('INSERT INTO chats (meeting_id, teacher_id, timestamp, speaker, text) VALUES %L returning *', arrayOfChats);

    const returnedObject = await client.query(chatQuery);
    console.log('------------------------------------');
    console.log('returnedObject.rows ----- chat')
    console.log(returnedObject.rows);
    console.log('------------------------------------');

    return returnedObject;



}