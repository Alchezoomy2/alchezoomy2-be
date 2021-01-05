const client = require('../client.js');
const isStudentAlsoTeacher = require('./isStudentAlsoTeacher.js');

module.exports = async (newStudentInfo) => {

    const currentDate = new Date().toISOString();

    const teacherId = await isStudentAlsoTeacher(newStudentInfo.account_id);
    console.log('------------------------------------');
    console.log(`teacherId:  ${teacherId}`);
    console.log('------------------------------------');
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
        account_created,
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
            teacherId,
            currentDate,
            currentDate
        ]);

    return returnedObject.rows[0];

}