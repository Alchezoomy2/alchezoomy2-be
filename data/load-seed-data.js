const client = require('../lib/client');
// import our seed data:
const usersData = require('./users.js');
const meetingData = require('./smpl-zoom-data.js');
const transcriptData = require('./smpl-zoom-data.js');
const chatData = require('./smpl-zoom-data.js');
const favData = require('./favorites.js');
// const teacherUser = require('./teacher-users.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash, user.meeting_fav]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      meetingData.map(meeting => {
        return client.query(`
                    INSERT INTO meetings (uuid, host_id, topic, start_time, share_url, duration, video_play_url, audio_play_url, transcript_url, chat_file, meeting_views, meeting_fav, user_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
                `,
        [meeting.uuid, meeting.host_id, meeting.topic, meeting.start_time, meeting.share_url, meeting.duration, meeting.video_play_url, meeting.audio_play_url, meeting.transcript_url, meeting.chat_file, meeting.meeting_views, meeting.meeting_fav, user.id]);
      })
    );
    
    await Promise.all(
      transcriptData.map(transcript => {
        return client.query(`
                      INSERT INTO transcripts (uuid, time_start, time_end, speaker, text, keywords)
                      VALUES ($1, $2, $3, $4, $5, $6)
                      RETURNING *;
                  `,
        [transcript.uuid, transcript.time_start, transcript.time_end, transcript.speaker, transcript.text, transcript.keywords]);
      })
    );

    await Promise.all(
      chatData.map(chat => {
        return client.query(`
                      INSERT INTO chats (uuid, timestamp, speaker, text)
                      VALUES ($1, $2, $3, $4)
                      RETURNING *;
                  `,
        [chat.uuid, chat.timestamp, chat.speaker, chat.text]);
      })
    );

    await Promise.all(
      favData.map(meeting => {
        return client.query(`
                    INSERT INTO favorites (uuid, host_id, topic, start_time, timestamp, speaker, text, user_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
                `,
        [meeting.uuid, meeting.host_id, meeting.topic, meeting.start_time, meeting.timestamp, meeting.speaker, meeting.text, user.id]);
      })
    );

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
