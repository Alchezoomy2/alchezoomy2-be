const client = require('../client.js');

module.exports = async (teacherId) => {

    const returnedMeetingsObj = await client.query(`
    SELECT *
    FROM meetings
    WHERE teacher_id = $1`,
        [teacherId]);
    console.log(returnedMeetingsObj.rows)
    return returnedMeetingsObj.rows;


}
