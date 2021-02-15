
const jwt = require('jsonwebtoken');
const fetch = require('superagent');

const parseReturnedStudentInfo = require('../utils/parseReturnedStudentInfo.js')
const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
const clientToken = process.env.CLIENT_TOKEN
const zoomUrl = process.env.ZOOM_URL
const appSecret = process.env.APP_SECRET


module.exports = class studentAuth {

    static async authorize({ code }) {
        try {
            const accessTokenUrl = precodeAccessUrl + code + postcodeAccessUrl;

            let returnedObject = await fetch
                .post(accessTokenUrl)
                .set('Authorization', `Basic ${clientToken}`);

            const oauthToken = returnedObject.body.access_token;

            let returnedStudentInfo = await fetch
                .get(zoomUrl + 'users/me')
                .set('Authorization', 'Bearer ' + oauthToken);

            const parsedStudentInfo = await parseReturnedStudentInfo(returnedStudentInfo.body, oauthToken);

            return parsedStudentInfo;
        }
        catch (err) {
            err.status = 401;
            throw err;
        }
    }

    static authToken(student) {
        return jwt.sign({ student: student }, appSecret, {
            expiresIn: '24h'
        });
    }

    static verifyAuthToken(token) {
        const { student } = jwt.verify(token, appSecret);
        return student;
    }

}