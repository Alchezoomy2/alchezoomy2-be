const jwt = require('jsonwebtoken');
const fetch = require('superagent');

const parseReturnedTeacherInfo = require('../utils/parseReturnedTeacherInfo.js')
const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
const clientToken = process.env.CLIENT_TOKEN
const zoomUrl = process.env.ZOOM_URL
const appSecret = process.env.APP_SECRET

module.exports = class teacherAuth {

    static async authorize({ code }) {
        try {
            const accessTokenUrl = precodeAccessUrl + code + postcodeAccessUrl;
            let returnedObject = await fetch
                .post(accessTokenUrl)
                .set('Authorization', `Basic ${clientToken}`);
            console.log("🚀 ~ file: teacher-auth.js ~ line 19 ~ teacherAuth ~ authorize ~  returnedObject", returnedObject.body)

            const oauthToken = returnedObject.body.access_token;
            console.log("🚀 ~ file: teacher-auth.js ~ line 22 ~ teacherAuth ~ authorize ~ oauthToken", oauthToken)

            let returnedTeacherInfo = await fetch
                .get(zoomUrl + 'users/me')
                .set('Authorization', 'Bearer ' + oauthToken);
            console.log("🚀 ~ file: teacher-auth.js ~ line 27 ~ teacherAuth ~ authorize ~ returnedTeacherInfo.body", returnedTeacherInfo.body)

            const parsedTeacherInfo = await parseReturnedTeacherInfo(returnedTeacherInfo.body, oauthToken);

            return parsedTeacherInfo;
        } catch (err) {
            throw err;
        }
    }

    static authToken(teacher) {
        return jwt.sign({ teacher }, appSecret, {
            expiresIn: '24h'
        });
    }

    static verifyAuthToken(token) {
        const { teacher } = jwt.verify(token, appSecret);
        return teacher;
    }

};
