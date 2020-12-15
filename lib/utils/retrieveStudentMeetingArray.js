const client = require('../client.js');

module.exports = async (permissions) => {
    let meetingsArray;

    for (let teacherId of permissions) {
        const returnedMeetingsObj = await client.query(`
        SELECT *
        FROM meetings
        WHERE teacher_id = $1
        AND published = true
        ORDER BY start_time DESC
        `, [teacherId]);

        meetingsArray.push(...returnedMeetingsObj.rows);
    }

    return meetingsArray;

}