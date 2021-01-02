const client = require('../client.js');

module.exports = async (studentAccountId) => {

    const returnedObject = await client.query(`
    SELECT *
    FROM teachers
    WHERE account_id = $1
    `, [studentAccountId]);

    if (returnedObject.rows[0]) {
        return [returnedObject.rows[0].id]
    }
    return [];
}