const client = require('../client.js');
const nfetch = require('node-fetch');
const format = require('pg-format');
const webvtt = require('node-webvtt');


module.exports = async (meetingObj, accessToken) => {

    const transcriptFile = await nfetch(meetingObj.transcript_url + accessToken);
    const transcriptText = await transcriptFile.text();
    const parsedTranscript = webvtt.parse(transcriptText, { strict: false });


    const arrayOfTranscripts = [];
    for (let cue of parsedTranscript.cues) {
        const timestamp = [
            Math.floor(cue.start / 3600),
            Math.floor(cue.start / 60),
            Math.floor(cue.start % 60)
        ].map(num => num < 10 ? "0" + num : num)
            .join(':');
        let speaker;
        let text;

        if (cue.text.includes(">")) {
            const textArray = cue.text.split(">");
            speaker = textArray[0].replace("<v", "");
            text = textArray[1];
        } else {
            speaker = "";
            text = cue.text;
        }
        let tempArray = [
            meetingObj.id,
            meetingObj.teacher_id,
            cue.identifier || "",
            cue.start,
            timestamp,
            cue.end,
            speaker,
            text,
        ]
        arrayOfTranscripts.push(tempArray);
    }

    const transcriptQuery = format('INSERT INTO transcripts (meeting_id, teacher_id, identifier, time_start, timestamp, time_end, speaker, text) VALUES %L RETURNING *', arrayOfTranscripts);


    const returnedObject = await client.query(transcriptQuery);

}
