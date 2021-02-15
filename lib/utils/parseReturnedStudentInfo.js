const client = require('../client.js');

module.exports = async (studentObj, oauthToken) => {


    const currentDate = new Date().toISOString().slice(0, 10);

    let studentInfo = {};

    const accountExists = await client.query(`
        SELECT *
        FROM students
        WHERE student_id = $1`,
        [studentObj.id]);

    if (accountExists.rows.length > 0) {

        const returnedStudentObj = await client.query(`
            UPDATE students
            SET
            last_update = $1,
            student_id = $2,
            user_name = $3,
            email = $4,
            pic_url = $5,
            account_id = $6,
            access_token = $7,
            timezone = $8
            WHERE id = $9
            RETURNING *
            `, [
            currentDate,
            studentObj.id,
            studentObj.first_name + ' ' + studentObj.last_name,
            studentObj.email,
            studentObj.pic_url,
            studentObj.account_id,
            oauthToken,
            studentObj.timezone,
            accountExists.rows[0].id,
        ]);

        studentInfo = returnedStudentObj.rows[0];
        studentInfo.new_user = false;
        studentInfo.id = accountExists.rows[0].id;

    } else {
        studentInfo = {
            studentId: studentObj.id,
            userName: studentObj.first_name + ' ' + studentObj.last_name,
            email: studentObj.email,
            picUrl: studentObj.pic_url,
            accountId: studentObj.account_id,
            access_token: oauthToken,
            newUser: true,
            timezone: studentObj.timezone
        }

    };

    return studentInfo;
}