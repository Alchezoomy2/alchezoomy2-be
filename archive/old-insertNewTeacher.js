const client = require('../client.js');

module.exports = async (newTeacherInfo) => {

    const currentDate = new Date().toISOString();

    const returnedObject = await client.query(`
    INSERT INTO teachers 
        (
            teacher_id, 
            user_name, 
            email, 
            pic_url, 
            account_id, 
            access_token,
            timezone, 
            account_created,
            last_update
        )
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
            newTeacherInfo.teacher_id,
            newTeacherInfo.user_name,
            newTeacherInfo.email,
            newTeacherInfo.pic_url,
            newTeacherInfo.account_id,
            newTeacherInfo.access_token,
            newTeacherInfo.timezone,
            currentDate,
            currentDate
        ]);

    return returnedObject.rows[0];

}


