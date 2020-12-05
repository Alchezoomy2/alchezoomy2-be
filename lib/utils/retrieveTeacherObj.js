const client = require('../client.js');

module.exports = async (teacherInfo) => {

    const currentDate = new Date().toISOString().slice(0, 10);

    const teacherObj = await client.query(`
    UPDATE teachers
    SET last_update = $2
    WHERE host_id = $1
    RETURNING *`,
        [
            teacherInfo.host_id,
            currentDate
        ]);

    return teacherObj.rows[0];

}