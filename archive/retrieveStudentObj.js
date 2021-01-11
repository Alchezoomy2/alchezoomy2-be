const client = require('../client.js');

module.exports = async (studentInfo) => {

    const currentDate = new Date().toISOString().slice(0, 10);

    const studentObj = await client.query(`
    UPDATE students
    SET last_update = $2
    WHERE student_id = $1
    RETURNING *`,
        [
            studentInfo.student_id,
            currentDate
        ]);

    return studentObj.rows[0];

}