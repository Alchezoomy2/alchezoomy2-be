// helper function that will take in the /meetings endpoint obj.body and returns an array of download_urls matching the filter conditions

const nfetch = require("node-fetch");
const webvtt = require("node-webvtt");

const client = require("../client");
const zoom_token = process.env.zoom_token;

module.exports = async (obj) => {
  let arr = [];
  obj.meetings.forEach(async (child) => {

    const uuid = child.uuid;

    // child.recording_files.filter(async (key) => {

    for (let key of child.recording_files) {

      if (key.recording_type === "audio_transcript") {

        const vtt_url = `${key.download_url}?access_token=${zoom_token}`;
        try {
          const request = await nfetch(vtt_url);
          const text = await request.text();

          const parsed = webvtt.parse(text);

          for (let dataPoint of parsed.cues) {

            const consoleLogMe = client.query(`
            INSERT INTO transcripts
            (uuid, identifier, time_start, time_end, speaker, text, keywords)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
              [uuid, dataPoint.identifier, dataPoint.start, dataPoint.end, '', dataPoint.text, 'keywords']);
          }
        } catch (e) {
          console.log('ERROR***********************')
          console.log(e.message);

        }

      }



    };
  }
  );
};
