module.exports = async (teacherObj, oauthToken) => {

    // check if user is in database, if so update that information, and return
    // published meeting information
    // new_user: false

    const teacherInfo = {
        new_user: true,
        host_id: teacherObj.id,
        user_name: teacherObj.first_name + ' ' + teacherObj.last_name,
        email: teacherObj.email,
        pic_url: teacherObj.pic_url,
        account_id: teacherObj.account_id,
        access_token: oauthToken,
    }


    return teacherInfo;
}