const client = require('../client.js');
const nfetch = require('node-fetch');
const format = require('pg-format');
const webvtt = require('node-webvtt');


module.exports = async (meetingObj, meetingId, accessToken) => {
    console.log("🚀 ~ file: insertNewTranscript.js ~ line 8 ~ module.exports= ~ meetingObj", meetingObj)

    const transcriptFile = await nfetch(meetingObj.transcript_url)// + accessToken);
    const transcriptText = await transcriptFile.text();
    const parsedTranscript = webvtt.parse(transcriptText, { strict: false });

    console.log("🚀 ~ file: insertNewTranscript.js ~ line 26 ~ module.exports= ~ meetingObj.teacher_id,", meetingObj.teacher_id,)

    const arrayOfTranscripts = [];
    for (let cue of parsedTranscript.cues) {
        let tempArray = [
            meetingObj.id,
            meetingObj.teacher_id,
            cue.identifier || "",
            cue.start,
            cue.end,
            cue.text || "",
        ]
        arrayOfTranscripts.push(tempArray);
    }

    const transcriptQuery = format('INSERT INTO transcripts (meeting_id, teacher_id, identifier, time_start, time_end, text) VALUES %L RETURNING *', arrayOfTranscripts);

    console.log("🚀 ~ file: insertNewTranscript.js ~ line 29 ~ module.exports= ~ transcriptQuery", transcriptQuery)



    const returnedObject = await client.query(transcriptQuery);
    console.log("🚀 ~ file: insertNewTranscript.js ~ line 33 ~ module.exports= ~ returnedObject", returnedObject)

    return returnedObject;
}
