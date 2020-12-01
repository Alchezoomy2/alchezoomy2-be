const client = require('../client.js');

module.exports = async (newTeacherInfo) => {

    const currentDate = new Date().toISOString().slice(0, 10);
    console.log(currentDate);

    const returnedObject = await client.query(`
    INSERT INTO teachers 
    (host_id, user_name, email, pic_url, account_id, access_token, last_update)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
            newTeacherInfo.host_id,
            newTeacherInfo.user_name,
            newTeacherInfo.email,
            newTeacherInfo.pic_url,
            newTeacherInfo.account_id,
            newTeacherInfo.access_token,
            currentDate
        ]);

    const teacherInfo = returnedObject.rows[0];

    return teacherInfo.id;
}


