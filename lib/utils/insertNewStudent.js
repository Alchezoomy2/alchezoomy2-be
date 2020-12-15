const client = require('../client.js');
const isStudentAlsoTeacher = require('./isStudentAlsoTeacher.js');

module.exports = async (newStudentInfo) => {

    const currentDate = new Date().toISOString.slice(0, 10);

    const teacherId = isStudentAlsoTeacher(newStudentInfo.account_id);

    const returnedObject = await client.query(`
    INSERT INTO students
    (
        student_id,
        user_name,
        pic_url,
        email,
        account_id,
        access_token,
        permissions,
        last_update
    ) 
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
        [
            newStudentInfo.student_id,
            newStudentInfo.user_name,
            newStudentInfo.pic_url,
            newStudentInfo.email,
            newStudentInfo.account_id,
            newStudentInfo.access_token,
            [teacherId],
            currentDate
        ]);

    return returnedObject.rows[0];

}