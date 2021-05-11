const client = require('../client.js');
const nfetch = require('node-fetch');
const format = require('pg-format');
const webvtt = require('node-webvtt');


module.exports = async (meetingObj, meetingId, accessToken) => {

    const transcriptFile = await nfetch(meetingObj.transcript_url)// + accessToken);
    const transcriptText = await transcriptFile.text();
    const parsedTranscript = webvtt.parse(transcriptText, { strict: false });


    const arrayOfTranscripts = [];
    for (let cue of parsedTranscript.cues) {
        let tempArray = [
            meetingId,
            meetingObj.teacherId,
            cue.identifier,
            cue.start,
            cue.end,
            cue.text,
            cue.styles
        ]
        arrayOfTranscripts.push(tempArray);
    }

    console.log("🚀 ~ file: insertNewTranscript.js ~ line 15 ~ module.exports= ~ arrayOfTranscripts", arrayOfTranscripts)
    const transcriptQuery = format('INSERT INTO transcripts (meeting_id, teacher_id, identifier, time_start, time_end, text) VALUES %L returning id', arrayOfTranscripts);
    console.log("🚀 ~ file: insertNewTranscript.js ~ line 30 ~ module.exports= ~ transcriptQuery", transcriptQuery)

    const returnedObject = await client.query(transcriptQuery);

    return returnedObject;
}
