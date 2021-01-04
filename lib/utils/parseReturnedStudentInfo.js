const client = require('../client.js');

module.exports = async (studentObj, oauthToken) => {

    const studentInfo = {
        student_id: studentObj.id,
        user_name: studentObj.first_name + ' ' + studentObj.last_name,
        email: studentObj.email,
        pic_url: studentObj.pic_url,
        account_id: studentObj.account_id,
        access_token: oauthToken
    }

    const accountExists = await client.query(`
    SELECT *
    FROM students
    WHERE student_id = $1`,
        [studentInfo.student_id]);

    if (accountExists.rows != '') {
        studentInfo.new_user = false;
        studentInfo.id = accountExists.rows[0].id;

        await client.query(`
        UPDATE students
        SET
        account_created = $1
        WHERE id = $2 
        `, [currentDate, accountExists.rows[0].id]);

    } else {
        studentInfo.new_user = true;
    };

    return studentInfo;
}