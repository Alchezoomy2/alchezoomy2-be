const client = require('../client.js');
const nfetch = require('node-fetch');
const format = require('pg-format');
const webvtt = require('node-webvtt');


module.exports = async (meetingObj, teacherId, meetingId) => {

    const transcriptFile = await nfetch(meetingObj.transcript_download_url);
    const transcriptText = await transcriptFile.text();
    const parsedTranscript = webvtt.parse(transcriptText, { strict: false });

    const arrayOfTranscripts = [];
    for (let cue of parsedTranscript.cues) {
        let tempArray = [
            meetingId,
            teacherId,
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
