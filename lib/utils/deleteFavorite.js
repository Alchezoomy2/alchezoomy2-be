const client = require('../client.js');

module.exports = async (favoriteId) => {

    const returnedFavoriteArray = await client.query(
        `DELETE FROM favorites
        WHERE id = $1
        RETURNING *`,
        [favoriteId]
    );

    return returnedFavoriteArray.rows[0].student_id;



}