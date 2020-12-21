const client = require('../client.js');

module.exports = async (studentAccountId) => {

    const returnedObject = await client.query(`
    SELECT 1
    FROM teachers
    WHERE account_id = $1
    `, [studentAccountId]);

    return returnedObject.rows[0].id || '';
}