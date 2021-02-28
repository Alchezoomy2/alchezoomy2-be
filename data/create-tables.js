const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {
  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE students (
                    id SERIAL PRIMARY KEY,
                    user_name VARCHAR(512) NOT NULL,
                    pic_url VARCHAR(512),
                    student_id VARCHAR(512) NOT NULL,
                    email VARCHAR(256) NOT NULL,
                    account_id VARCHAR(512) NOT NULL,
                    access_token VARCHAR,
                    account_created TEXT NOT NULL,
                    timezone TEXT NOT NULL,
                    last_update TEXT NOT NULL
                    );          
                                      
                CREATE TABLE teachers (
                    id SERIAL PRIMARY KEY NOT NULL,
                    teacher_id VARCHAR(512) NOT NULL,
                    user_name VARCHAR(512) NOT NULL,
                    email VARCHAR(512),
                    pic_url VARCHAR(512),
                    color VARCHAR(512),
                    account_id VARCHAR(512) NOT NULL,
                    timezone TEXT NOT NULL,
                    account_created TEXT NOT NULL,
                    last_update VARCHAR(256) NOT NULL
                    );

                CREATE TABLE meetings (
                    id SERIAL PRIMARY KEY NOT NULL,
                    published BOOLEAN NOT NULL,
                    teacher_id INTEGER NOT NULL,
                    host_id VARCHAR(512) NOT NULL,
                    account_id VARCHAR(512) NOT NULL,
                    user_name VARCHAR(512),
                    pic_url VARCHAR(512),
                    color VARCHAR(512),
                    topic VARCHAR(512) NOT NULL,
                    display_time TEXT NOT NULL,
                    start_time VARCHAR(512) NOT NULL,
                    duration INTEGER NOT NULL,
                    share_url VARCHAR NOT NULL,
                    video_url VARCHAR,
                    audio_url VARCHAR,
                    transcript_url VARCHAR,
                    chat_url VARCHAR,
                    meeting_views INTEGER NOT NULL,
                    meeting_favs INTEGER NOT NULL,
                    zoom_meeting_id VARCHAR
                    );

                CREATE TABLE transcripts (
                    id SERIAL PRIMARY KEY NOT NULL,
                    meeting_id INTEGER NOT NULL,
                    teacher_id INTEGER NOT NULL,
                    identifier VARCHAR(512) NOT NULL,
                    time_start FLOAT NOT NULL,
                    time_end FLOAT NOT NULL,
                    text VARCHAR NOT NULL
                    );

                CREATE TABLE chats (
                    id SERIAL PRIMARY KEY NOT NULL,
                    meeting_id INTEGER NOT NULL,
                    teacher_id INTEGER NOT NULL,
                    timestamp VARCHAR(512) NOT NULL,
                    parsed_timestamp INTEGER NOT NULL,
                    speaker VARCHAR(512) NOT NULL,
                    text VARCHAR(512) NOT NULL
                    );

                CREATE TABLE favorites (
                    id SERIAL PRIMARY KEY NOT NULL,
                    meeting_id INTEGER NOT NULL,
                    student_id INTEGER NOT NULL,
                    comment TEXT
                    );

                CREATE TABLE bookmarks (
                    id SERIAL PRIMARY KEY NOT NULL,
                    chat_id INTEGER NOT NULL,
                    student_id INTEGER NOT NULL,
                    comment TEXT
                    );

                  CREATE TABLE subscriptions (
                    id SERIAL PRIMARY KEY NOT NULL,
                    student_id INTEGER NOT NULL,
                    teacher_id INTEGER NOT NULL,
                    creation_date VARCHAR NOT NULL
                  )
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
