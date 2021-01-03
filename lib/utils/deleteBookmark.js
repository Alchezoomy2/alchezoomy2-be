const client = require('../client.js');


module.exports = async (bookmarkId) => {

    const returnedObject = await client.query(
        `DELETE FROM bookmarks
        WHERE id = $1
        RETURNING *`,
        [bookmarkId]);

    console.log(returnedObject.rows)
    return returnedObject.rows[0].student_id
}