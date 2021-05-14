const fetch = require('superagent');

const zoomUrl = process.env.ZOOM_URL;

module.exports = async (accessToken, zoomMeetingId) => {
    try {
        const { body } = await fetch
            .get(`${zoomUrl}meetings/${zoomMeetingId}/recordings`)
            .set('Authorization', `Bearer ${accessToken}`)

        return body;
    } catch (e) {
        throw (e)
    }
}