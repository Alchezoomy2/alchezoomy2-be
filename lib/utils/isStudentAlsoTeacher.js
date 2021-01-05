const client = require('../client.js');

module.exports = async (studentAccountId) => {
    console.log('------------------------------------');
    console.log(`studentAccountId:  ${studentAccountId}`);
    console.log('------------------------------------');

    const returnedObject = await client.query(`
    SELECT *
    FROM teachers
    WHERE account_id = $1
    `, [studentAccountId]);

    if (returnedObject.rows[0].length > 0) {
        const returnArray = [returnedObject.rows[0].id]
        console.log(returnArray)

        return returnArray;
    }
    return [];
}