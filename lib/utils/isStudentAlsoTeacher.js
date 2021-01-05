const client = require('../client.js');

module.exports = async (studentId) => {
    console.log('------------------------------------');
    console.log(`studentId:  ${studentId}`);
    console.log('------------------------------------');

    const returnedObject = await client.query(`
    SELECT *
    FROM teachers
    WHERE teacher_id = $1
    `, [studentId]);

    console.log(returnedObject.rows)

    if (returnedObject.rows[0].length > 0) {
        const returnArray = [returnedObject.rows[0].id]
        console.log(returnArray)

        return returnArray;
    }
    return [];
}