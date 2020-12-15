const client = require('../client.js');

module.exports = async (studentAccountId) => {

    const returnedObject = await client.query(`
    SELECT *
    FROM teachers
    WHERE account_id = $1
    `, [studentAccountId]);

    console.log('------------------------------------');
    console.log(`returnedObject.rows:  ${returnedObject.rows}`);
    console.log('------------------------------------');

    console.log('------------------------------------');
    console.log(`returnedObject.rows[0].id:  ${returnedObject.rows[0].id}`);
    console.log('------------------------------------');
    return [returnedObject.rows[0].id] || '[]';
}