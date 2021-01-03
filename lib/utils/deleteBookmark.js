const client = require('../client.js');


module.exports = async (bookmarkId) => {

    console.log(bookmarkId)
    const returnedObject = await client.query(
        `DELETE FROM bookmarks
        WHERE chat_id = $1
        RETURNING *`,
        [bookmarkId]);

    console.log(returnedObject)
    return returnedObject.rows[0].student_id
}