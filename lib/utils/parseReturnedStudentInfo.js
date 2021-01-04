const client = require('../client.js');

module.exports = async (studentObj, oauthToken) => {


    const currentDate = new Date().toISOString().slice(0, 10);

    let studentInfo = {};

    const accountExists = await client.query(`
        SELECT *
        FROM students
        WHERE student_id = $1`,
        [studentInfo.student_id]);

    console.log(accountExists.rows)

    if (accountExists.rows !== []) {
        console.log('inside')
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
            student_id: studentObj.id,
            user_name: studentObj.first_name + ' ' + studentObj.last_name,
            email: studentObj.email,
            pic_url: studentObj.pic_url,
            account_id: studentObj.account_id,
            access_token: oauthToken,
            new_user: true,
            timezone: studentObj.timezone
        }

    };
    console.log(studentInfo)
    return studentInfo;
}