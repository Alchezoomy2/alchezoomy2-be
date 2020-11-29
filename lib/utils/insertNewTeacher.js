const client = require('../client.js');

module.exports = async (newUserInfo) => {

    const returnedObject = await client.query(`
    INSERT INTO teachers 
    (host_id, user_name, email, pic_url, account_id)
    VALUES
        ($1, $2, $3, $4, $5)
        RETURNING id`,
        [
            newUserInfo.host_id,
            newUserInfo.user_name,
            newUserInfo.email,
            newUserInfo.pic_url,
            newUserInfo.account_id,
        ]);

    const teacherInfo = returnedObject.rows[0];
    return teacherInfo;
}