const client = require('../client.js');

module.exports = async (favoriteId) => {

    const returnedFavoriteArray = await client.query(
        `DELETE FROM favorites
        WHERE id = $1
        RETURNING *`,
        [favoriteId]
    );

    await client.query(
        `UPDATE meetings
        SET meeting_favs = meeting_favs - 1
        WHERE id = $1`,
        [returnedFavoriteArray.rows[0].meeting_id]

    )

    return returnedFavoriteArray.rows[0].student_id;



}