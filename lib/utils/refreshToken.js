const fetch = require('superagent');

const client_token = process.env.CLIENT_TOKEN;
const refresh_token_url = process.env.REFRESH_TOKEN_URL;

module.exports = async ({ refresh_token, access_token, token_created }) => {
    try {
        // if (token_created < Date.now() - 1800) {
        if (token_created < Date.now()) {

            let returnedObject = await fetch
                .post(refresh_token_url + refresh_token)
                .set('Authorization', `Basic ${client_token}`);

            console.log("🚀 ~ file: refreshToken.js ~ line 13 ~ returnedObject", returnedObject)

            return { ...returnedObject, token_created: Date.now() };

        }

        return { refresh_token, access_token, token_created }

    } catch (err) {
        throw (err)
    }

}