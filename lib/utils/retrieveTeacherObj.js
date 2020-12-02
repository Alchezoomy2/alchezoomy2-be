const client = require('../client.js');

module.exports = async (teacherInfo) => {
    console.log('retrieveTeacherObj.js')
    const teacherObj = await client.query(`
    SELECT *
    FROM teachers
    WHERE host_id = $1`,
        [teacherInfo.host_id]);

    return teacherObj.rows[0];

}