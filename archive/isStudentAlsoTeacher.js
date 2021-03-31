const client = require('../lib/client.js');

module.exports = async (studentId) => {

    const returnedObject = await client.query(`
    SELECT *
    FROM teachers
    WHERE teacher_id = $1
    `, [studentId]);


    if (returnedObject.rows.length > 0) {
        const returnArray = [returnedObject.rows[0].id]

        return returnArray;
    }
    return [];
}