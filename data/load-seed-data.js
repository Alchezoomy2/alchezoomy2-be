const client = require('../lib/client');
// import our seed data:
const zoomData = require('./smpl-zoom-data.js');
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
      zoomData.map(zoom => {
        return client.query(`
                    INSERT INTO zoom_data (name, cool_factor, owner_id)
                    VALUES ($1, $2, $3);
                `,
        [zoom.name, zoom.cool_factor, student.id]);
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
