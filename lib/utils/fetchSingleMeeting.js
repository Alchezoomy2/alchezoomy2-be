const fetch = require('superagent');

const zoomUrl = process.env.ZOOM_URL;

module.exports = async (accessToken, zoomMeetingId) => {
    try {
        const { body } = await fetch
            .get(`${zoomUrl}meetings/${zoomMeetingId}/recordings`)
            .set('Authorization', `Bearer ${accessToken}`)

        console.log("🚀 ~ file: fetchSingleMeeting.js ~ line 10 ~ module.exports= ~ body", body)

        return body;
    } catch (e) {
        throw (e)
    }
}