const client = require('../client.js');

module.exports = async (teacherId) => {

    const returnedMeetingsObj = await client.query(`
    SELECT *
    FROM meetings
    WHERE teacher_id = $1
    ORDER BY start_time DESC`,
        [teacherId]);

    return returnedMeetingsObj.rows;


}
