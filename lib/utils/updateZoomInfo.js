const fetch = require('superagent')

const zoomUrl = process.env.ZOOM_URL;

module.exports = async (access_token, zoom_meeting_id, topic) => {

    console.log("🚀 ~ file: updateZoomInfo.js ~ line 8 ~ module.exports= ~  topic", topic)
    try {
        const response = await fetch
            .patch(`${zoomUrl}meetings/${zoom_meeting_id}/recordings/settings`)
            .set('Authorization', 'Bearer ' + access_token)
            .send({ topic })

        console.log("🚀 ~ file: updateZoomInfo.js ~ line 13 ~ module.exports= ~ response", response.status)

    } catch (e) {
        throw (e)
    }
}