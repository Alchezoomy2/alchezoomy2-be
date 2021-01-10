const client = require('../client.js');

module.exports = async (teacherInfo) => {

    const currentDate = new Date().toISOString();

    const teacherObj = await client.query(`
    UPDATE teachers
    SET last_update = $2
    WHERE teacher_id = $1
    RETURNING *`,
        [
            teacherInfo.teacher_id,
            currentDate
        ]);

    return teacherObj.rows[0];

}