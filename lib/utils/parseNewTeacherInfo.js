const client = require('../client.js');
const fetchColorPalette = require('../utils/fetchColorPalette')

module.exports = async (teacherObj, access_token, refresh_token) => {
    token_created = Date.now();

    const accountExists = await client.query(`
        SELECT *
        FROM teachers
        WHERE teacher_id = $1`,
        [teacherObj.id]);

    if (accountExists.rows.length < 0) {

        const colorPalette = await fetchColorPalette(teacherObj.pic_url)

        teacherInfo = {
            teacherId: teacherObj.id,
            userName: teacherObj.first_name + ' ' + teacherObj.last_name,
            email: teacherObj.email,
            picUrl: teacherObj.pic_url,
            accountId: teacherObj.account_id,
            access_token,
            refresh_token,
            token_created,
            newUser: true,
            timezone: teacherObj.timezone,
            colorPalette
        }

        return teacherInfo
    }

    return { message: "Teacher already exists" }

}