const fetch = require('superagent')

const zoomUrl = process.env.ZOOM_URL

module.exports = async (accessToken, zoomMeetingId, topic) => {
    console.log("🚀 ~ file: updateZoomInfo.js ~ line 6 ~ module.exports= ~ accessToken, zoomMeetingId, topic", accessToken, zoomMeetingId, topic)
    try {
        const response = await fetch
            .patch(`${zoomUrl}meetings/${zoomMeetingId}/recordings/settings`)
            .set('Authorization', 'Bearer ' + accessToken)
            .send({ topic })
        console.log("🚀 ~ file: updateZoomInfo.js ~ line 11 ~ module.exports= ~ response", response.body)

    } catch (e) {
        throw (e)
    }
}