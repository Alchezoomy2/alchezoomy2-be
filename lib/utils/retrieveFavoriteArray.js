const client = require('../client.js');


module.exports = async (studentId) => {

    const returnedFavorites = await client.query(
        `SELECT
        meeting_id,
        comment,
        display_time,
        favorites.id,
        pic_url,
        topic,
        user_name
    FROM favorites
    LEFT JOIN meetings
        ON favorites.meeting_id = meetings.id
    WHERE student_id = $1
    AND meetings.id IS NOT NULL`,
        [studentId]
    );

    return returnedFavorites.rows;
}