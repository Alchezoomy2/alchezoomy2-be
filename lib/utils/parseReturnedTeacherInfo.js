const client = require('../client.js');

module.exports = async (teacherObj, oauthToken) => {

    // creates teacherInfo object, and populates it from information
    // returned from ZOOM API

    const currentDate = new Date().toISOString().slice(0, 10);

    const teacherInfo = {};

    const accountExists = await client.query(`
        SELECT *
        FROM teachers
        WHERE teacher_id = $1`,
        [teacherInfo.teacher_id]);

    if (accountExists.rows != '') {

        const returnedteacherObj = await client.query(`
            UPDATE teachers
            SET
            last_update = $1,
            teacher_id = $2,
            user_name = $3,
            email = $4,
            pic_url = $5,
            account_id = $6,
            access_token = $7
            WHERE id = $8
            RETURNING *
            `, [
            currentDate,
            teacherObj.id,
            teacherObj.first_name + ' ' + teacherObj.last_name,
            teacherObj.email,
            teacherObj.pic_url,
            teacherObj.account_id,
            oauthToken,
            accountExists.rows[0].id,
        ]);

        teacherInfo = returnedteacherObj.rows[0];
        teacherInfo.new_user = false;
        teacherInfo.id = accountExists.rows[0].id;

    } else {
        teacherInfo = {
            teacher_id: teacherObj.id,
            user_name: teacherObj.first_name + ' ' + teacherObj.last_name,
            email: teacherObj.email,
            pic_url: teacherObj.pic_url,
            account_id: teacherObj.account_id,
            access_token: oauthToken,
            new_user = true
        }

    };
    console.log(teacherInfo)
    return teacherInfo;
}