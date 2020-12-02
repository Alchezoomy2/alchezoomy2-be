const client = require('../client.js');

module.exports = async (teacherId) => {

    const returnedMeetingsObj = await client.query(`
    SELECT *
    FROM meetings
    WHERE teacher_id = $1`,
        [teacherId]);

    return returnedMeetingsObj.rows;


}
