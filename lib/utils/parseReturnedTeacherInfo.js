const client = require('../client.js');
const Teacher = require('../models/Teacher')
const { getPaletteFromURL } = require('color-thief-node');

module.exports = async (teacherObj, oauthToken) => {

    const currentDate = new Date().toISOString().slice(0, 10);

    let teacherInfo = {};

    const accountExists = await client.query(`
        SELECT *
        FROM teachers
        WHERE teacher_id = $1`,
        [teacherObj.id]);

    if (accountExists.rows.length > 0) {

        const returnedteacherObj = await client.query(`
            UPDATE teachers
            SET
            user_name = $1,
            email = $2,
            pic_url = $3,
            account_id = $4,
            timezone = $5
            WHERE id = $6
            RETURNING *
            `, [
            teacherObj.first_name + ' ' + teacherObj.last_name,
            teacherObj.email,
            teacherObj.pic_url,
            teacherObj.account_id,
            teacherObj.timezone,
            accountExists.rows[0].id,
        ]);

        teacherInfo = {
            ...new Teacher(returnedteacherObj.rows[0]),
            newUser: false,
            id: accountExists.rows[0].id,
            access_token: oauthToken
        }

    } else {
        const colorPalette = await getPaletteFromURL(teacherObj.pic_url);
        const hexPalette = colorPalette.map(color => `#${componentToHex(color[0])}${componentToHex(color[1])}${componentToHex(color[2])}`)
        teacherInfo = {
            teacherId: teacherObj.id,
            userName: teacherObj.first_name + ' ' + teacherObj.last_name,
            email: teacherObj.email,
            picUrl: teacherObj.pic_url,
            accountId: teacherObj.account_id,
            access_token: oauthToken,
            newUser: true,
            timezone: teacherObj.timezone,
            colorPalette: hexPalette
        }

    };

    function componentToHex(color) {
        let hex = color.toString(16);
        return hex.length == 1 ? "0" + hex : hex
    }

    return teacherInfo;
}