const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {
  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL
                );           
                CREATE TABLE meetings (
                   id SERIAL PRIMARY KEY NOT NULL,
                    uuid VARCHAR(512) NOT NULL,
                    host_id VARCHAR(512) NOT NULL,
                    topic VARCHAR(512) NOT NULL,
                    start_time VARCHAR(512) NOT NULL,
                    share_url VARCHAR(512) NOT NULL,
                    video_play_url VARCHAR(512) NOT NULL,
                    audio_play_url VARCHAR(512) NOT NULL,
                    transcript_url VARCHAR(512) NOT NULL,
                    chat_file VARCHAR(512) NOT NULL,
                    meeting_views INTEGER NOT NULL,
                    meeting_fav INTEGER NOT NULL,
                    duration INTEGER NOT NULL
            );
                CREATE TABLE transcripts (
                    id SERIAL PRIMARY KEY NOT NULL,
                    uuid VARCHAR(512) NOT NULL,
                    identifier VARCHAR(512) NOT NULL,
                    time_start FLOAT NOT NULL,
                    time_end FLOAT NOT NULL,
                    speaker VARCHAR(512) NOT NULL,
                    text VARCHAR(512) NOT NULL,
                    keywords VARCHAR(512) NOT NULL
          );
                CREATE TABLE chats (
                    id SERIAL PRIMARY KEY NOT NULL,
                    uuid VARCHAR(512) NOT NULL,
                    timestamp VARCHAR(512) NOT NULL,
                    speaker VARCHAR(512) NOT NULL,
                    text VARCHAR(512) NOT NULL
          );
                CREATE TABLE favorites (
                    id SERIAL PRIMARY KEY NOT NULL,
                    uuid VARCHAR(512) NOT NULL,
                    host_id VARCHAR(512) NOT NULL,
                    topic VARCHAR(512) NOT NULL,
                    start_time INTEGER NOT NULL,
                    timestamp INTEGER NOT NULL,
                    speaker VARCHAR(512) NOT NULL,
                    text VARCHAR(512) NOT NULL,
                    owner_id INTEGER NOT NULL REFERENCES users(id)
          );
        `);

    console.log('create tables complete');
  } catch (err) {
    // problem? let's see the error...
    console.log(err);
  } finally {
    // success or failure, need to close the db connection
    client.end();
  }
}
