const client = require('../client.js');

module.exports = async (teacherObj, oauthToken) => {

    // check if user is in database, if so update that information, and return
    // published meeting information
    const new_user = true;
    console.log('pre-SQL');
    console.log(teacherObj.host_id);
    const teacher_id = await client.query(`
        SELECT TOP 1 teachers.id
        FROM teachers
        WHERE teachers.host_id = $1
        `,
        [teacherObj.host_id]);

    console.log('post-SQL');
    console.log(teacher_id);

    if (teacher_id) {
        //   pull published meetings from database
        new_user = false;
    }

    const teacherInfo = {
        new_user,
        host_id: teacherObj.id,
        user_name: teacherObj.first_name + ' ' + teacherObj.last_name,
        email: teacherObj.email,
        pic_url: teacherObj.pic_url,
        account_id: teacherObj.account_id,
        access_token: oauthToken,
    }

    console.log(teacherInfo);

    return teacherInfo;
}