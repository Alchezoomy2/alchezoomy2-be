const client = require('./client.js');

module.exports = async (meetingObj) => {
    return client.query(`
    INSERT INTO teachers 
    (host_id, user_name, email, pic_url, color, account_id)
    VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING id`,
        [
            meetingObj.host_id,
            meetingObj.user_name,
            meetingObj.email,
            meetingObj.pic_url,
            meetingObj.color,
            meetingObj.account_id,
        ]);
}