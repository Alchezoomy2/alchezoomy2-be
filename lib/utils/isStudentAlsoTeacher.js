const client = require('../client.js');

module.exports = async (studentAccountId) => {

    const returnedObject = await client.query(`
    SELECT *
    FROM teachers
    WHERE account_id = $1
    `, [studentAccountId]);

    console.log('------------------------------------');
    console.log(returnedObject.rows[0]);
    console.log('------------------------------------');
    return returnedObject.rows[0].id ? returnedObject.rows[0].id : '';
}