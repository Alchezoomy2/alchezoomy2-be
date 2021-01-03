const client = require('../client.js');

module.exports = async (studentId) => {

    const returnedObject = await client.query(
        `SELECT *
        FROM bookmarks
        WHERE student_id = $1`,
        [studentId]
    );

    if (returnedObject.rows) {
        return returnedObject.rows
    }
    return [];
}