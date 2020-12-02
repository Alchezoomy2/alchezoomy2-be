const client = require('../client.js');

module.exports = async (teacherInfo) => {

    const teacherObj = await client.query(`
    SELECT *
    FROM teachers
    WHERE host_id = $1`,
        [teacherInfo.host_id]);

    return teacherObj;

}