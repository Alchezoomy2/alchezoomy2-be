const client = require('../client.js');
const nfetch = require('node-fetch');
const format = require('pg-format');
const webvtt = require('node-webvtt');


module.exports = async (meetingObj, meetingId, accessToken) => {

    console.log("🚀 ~ file: insertNewTranscript.js ~ line 8 ~ module.exports= ~ meetingObj, meetingId, accessToken", meetingObj, meetingId, accessToken)
    console.log("Publish audio_transcript")

    const transcriptFile = await nfetch(meetingObj.transcript_download_url)// + accessToken);
    console.log(transcriptFile)
    const transcriptText = await transcriptFile.text();
    console.log(transcriptText)
    const parsedTranscript = webvtt.parse(transcriptText, { strict: false });
    console.log("🚀 ~ file: insertNewTranscript.js ~ line 15 ~ module.exports= ~ parsedTranscript", parsedTranscript)

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

    const transcriptQuery = format('INSERT INTO transcripts (meeting_id, teacher_id, identifier, time_start, time_end, text) VALUES %L returning id', arrayOfTranscripts);

    const returnedObject = await client.query(transcriptQuery);

    return returnedObject;
}

console.log("🚀 ~ file: insertNewTranscript.js ~ line 39 ~ module.exports= ~ transcriptFile", transcriptFile)

console.log("🚀 ~ file: insertNewTranscript.js ~ line 41 ~ module.exports= ~ transcriptFile", transcriptFile)

console.log("🚀 ~ file: insertNewTranscript.js ~ line 43 ~ module.exports= ~ transcriptFile", transcriptFile)

console.log("🚀 ~ file: insertNewTranscript.js ~ line 45 ~ module.exports= ~ transcriptFile", transcriptFile)

console.log("🚀 ~ file: insertNewTranscript.js ~ line 47 ~ module.exports= ~ transcriptFile", transcriptFile)
