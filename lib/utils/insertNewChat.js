const client = require('../client.js');
const nfetch = require('node-fetch');
const format = require('pg-format');



module.exports = async (meetingObj, meetingId, accessToken) => {
    console.log(accessToken)
    console.log((meetingObj.chat_url + accessToken))
    const chatFile = await nfetch(meetingObj.chat_url + accessToken);
    console.log(chatFile.text)
    const text = await chatFile.text();
    const firstParse = text.split('\r\n');
    console.log(text)

    const arrayOfChats = [];
    for (let line of firstParse) {
        const tempArray = line.split('\t');
        console.log(tempArray[0])
        if (tempArray[0]) {
            console.log('------------------------------------');
            console.log(`tempArray[1]:  ${tempArray[1]}`);
            console.log('------------------------------------');
            arrayOfChats.push([
                meetingObj.teacher_id,
                meetingId,
                tempArray[0] || '',
                tempArray[1] || '',
                tempArray[2] || '',
            ])
        };
    };


    const chatQuery = format('INSERT INTO chats (meeting_id, teacher_id, timestamp, speaker, text) VALUES %L returning *', arrayOfChats);

    const returnedObject = await client.query(chatQuery);

    return returnedObject;



}