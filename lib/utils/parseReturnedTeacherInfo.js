const client = require('../client.js');

module.exports = async (teacherObj, oauthToken) => {

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

    // if accountExists found a match, mark new_user to false
    if (accountExists.rows != '') {
        teacherInfo.new_user = false;
        // else mark new_user to true
    } else {
        teacherInfo.new_user = true;
    };

    return teacherInfo;
}