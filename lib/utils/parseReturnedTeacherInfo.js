const client = require('../client.js');
const Teacher = require('../models/Teacher')

module.exports = async (teacherObj, access_token, refresh_token) => {

    // const currentDate = new Date().toISOString().slice(0, 10);
    token_created = Date.now();

    let teacherInfo = {};

    const accountExists = await client.query(`
        SELECT *
        FROM teachers
        WHERE teacher_id = $1`,
        [teacherObj.id]);

    console.log("🚀 ~ file: parseReturnedTeacherInfo.js ~ line 16 ~ module.exports= ~ accountExists", accountExists)


    if (accountExists.rows.length < 0) {

        const returnedteacherObj = await client.query(`
            UPDATE teachers
            SET
            user_name = $1,
            email = $2,
            pic_url = $3,
            account_id = $4,
            timezone = $5
            WHERE id = $6
            RETURNING *
            `, [
            teacherObj.first_name + ' ' + teacherObj.last_name,
            teacherObj.email,
            teacherObj.pic_url,
            teacherObj.account_id,
            teacherObj.timezone,
            accountExists.rows[0].id,
        ]);

        teacherInfo = {
            ...new Teacher(returnedteacherObj.rows[0]),
            newUser: false,
            id: accountExists.rows[0].id,
            access_token,
            refresh_token,
            token_created
        }

        return teacherInfo;

    }

    return { message: "Teacher doesn't exist.  Please contact admin." }

}