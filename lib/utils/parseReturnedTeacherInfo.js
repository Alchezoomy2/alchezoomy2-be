const client = require('../client.js');

module.exports = async (teacherObj, oauthToken) => {

    const currentDate = new Date().toISOString().slice(0, 10);

    let teacherInfo = {};

    const accountExists = await client.query(`
        SELECT *
        FROM teachers
        WHERE teacher_id = $1`,
        [teacherObj.id]);

    if (accountExists.rows.length > 0) {

        const returnedteacherObj = await client.query(`
            UPDATE teachers
            SET
            user_name = $1,
            email = $2,
            pic_url = $3,
            account_id = $4,
            access_token = $5,
            timezone = $6
            WHERE id = $7
            RETURNING *
            `, [
            teacherObj.first_name + ' ' + teacherObj.last_name,
            teacherObj.email,
            teacherObj.pic_url,
            teacherObj.account_id,
            oauthToken,
            teacherObj.timezone,
            accountExists.rows[0].id,
        ]);

        teacherInfo = returnedteacherObj.rows[0];
        teacherInfo.new_user = false;
        teacherInfo.id = accountExists.rows[0].id;

    } else {
        teacherInfo = {
            teacherId: teacherObj.id,
            userName: teacherObj.first_name + ' ' + teacherObj.last_name,
            email: teacherObj.email,
            picUrl: teacherObj.pic_url,
            accountId: teacherObj.account_id,
            access_token: oauthToken,
            newUser: true,
            timezone: teacherObj.timezone
        }

    };

    return teacherInfo;
}