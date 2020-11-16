const client = require('../lib/client');
// import our seed data:
const meetingData = require('./smpl-zoom-data.js');
const studentUser = require('./student-users.js');
// const teacherUser = require('./teacher-users.js');

run();

async function run() {

  try {
    await client.connect();

    const students = await Promise.all(
      studentUser.map(student => {
        return client.query(`
                      INSERT INTO students (email, role, hash)
                      VALUES ($1, $2, $3)
                      RETURNING *;
                  `,
        [student.email, student.role, student.hash]);
      })
    );
      
    const student = students[0].rows[0];

    await Promise.all(
      meetingData.map(meeting => {
        return client.query(`
                    INSERT INTO meeting_data (name, cool_factor, owner_id)
                    VALUES ($1, $2, $3);
                `,
        [meeting.name, meeting.cool_factor, student.id]);
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
