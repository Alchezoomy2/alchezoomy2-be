const client = require('../client.js');

module.exports = async (newTeacherInfo) => {

    const returnedObject = await client.query(`
    INSERT INTO teachers 
    (host_id, user_name, email, pic_url, account_id, access_token)
    VALUES
        ($1, $2, $3, $4, $5)
        RETURNING id`,
        [
            newTeacherInfo.host_id,
            newTeacherInfo.user_name,
            newTeacherInfo.email,
            newTeacherInfo.pic_url,
            newTeacherInfo.account_id,
            newTeacherInfo.access_token
        ]);

    const teacherInfo = returnedObject.rows[0];
    teacherInfo.new_user = false;
    return teacherInfo;
}