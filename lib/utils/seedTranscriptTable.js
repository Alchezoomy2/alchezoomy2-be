/* eslint-disable indent */
const client = require("../client");


module.exports = async (cues, uuid) => {

    for (let dataPoint of cues) {
        await client.query(
            `
  INSERT INTO transcripts
  (uuid, identifier, time_start, time_end, speaker, text, keywords)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7) 
  RETURNING *`,
            [
                uuid,
                dataPoint.identifier,
                dataPoint.start,
                dataPoint.end,
                "",
                dataPoint.text,
                "keywords",
            ]
        );

    }
}