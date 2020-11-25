const client = require('../client.js');

module.exports = async (meetingObj) => {

    const returnedObject = await client.query(`
    INSERT INTO teachers 
    (host_id, user_name, email, pic_url, account_id)
    VALUES
        ($1, $2, $3, $4, $5)
        RETURNING id`,
        [
            meetingObj.host_id,
            meetingObj.user_name,
            meetingObj.email,
            meetingObj.pic_url,
            meetingObj.account_id,
        ]);

    const teacher_id = returnedObject.rows[0].id;
    return teacher_id;
}