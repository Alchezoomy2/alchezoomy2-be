const client = require('../client.js');

module.exports = async (teacherObj, oauthToken) => {

    // check if user is in database, if so update that information, and return
    // published meeting information
    // const new_user = true;
    // console.log('pre-SQL');
    // console.log(teacherObj.id);
    // const teacher_id = await client.query(`
    //     SELECT TOP 1 teachers.id
    //     FROM teachers
    //     WHERE teachers.host_id = $1
    //     `,
    //     [teacherObj.id]);

    // console.log('post-SQL');
    // console.log(teacher_id);

    // if (teacher_id) {
    //     //   pull published meetings from database
    //     new_user = false;
    // }

    // creates teacherInfo object, and populates it from information
    // returned from ZOOM API
    const teacherInfo = {
        host_id: teacherObj.id,
        user_name: teacherObj.first_name + ' ' + teacherObj.last_name,
        email: teacherObj.email,
        pic_url: teacherObj.pic_url,
        account_id: teacherObj.account_id,
        access_token: oauthToken,

    };

    // checks database if there are rows where the host_id matches our passed host_id
    const accountExists = await client.query(`
        SELECT 1
        FROM teachers
        WHERE teachers.host_id = $1`,
        [teacherObj.id]);

    console.log(accountExists.rows);

    if (accountExists.rose != []) {
        teacherInfo.new_user = false;
        console.log('existing user!!')
    } else {
        console.log('new user!');
        teacherInfo.new_user = true;
    };

    return teacherInfo;
}