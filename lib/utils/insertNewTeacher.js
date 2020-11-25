const client = require('../client.js');

module.exports = async (meetingObj) => {
    // console.log('inside!')
    // console.log(meetingObj);

    const enteredMeeting = await client.query(`
    INSERT INTO teachers 
    (host_id, user_name, email, pic_url, color, account_id)
    VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [
            meetingObj.host_id,
            meetingObj.user_name,
            meetingObj.email,
            meetingObj.pic_url,
            meetingObj.color,
            meetingObj.account_id,
        ]);

    // console.log(enteredMeeting);
    return enteredMeeting;
}