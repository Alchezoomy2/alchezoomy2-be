const fetch = require('superagent')

const zoomUrl = process.env.ZOOM_URL;

module.exports = async (access_token, zoom_meeting_id, topic) => {

    console.log("🚀 ~ file: updateZoomInfo.js ~ line 6 ~ module.exports= ~ access_token, zoom_meeting_id, topic", access_token, zoom_meeting_id, topic)
    try {
        const response = await fetch
            .patch(`${zoomUrl}meetings/${zoom_meeting_id}/recordings/settings`)
            .set('Authorization', 'Bearer ' + access_token)
            .send({ topic })
        console.log("🚀 ~ file: updateZoomInfo.js ~ line 13 ~ module.exports= ~ response", response)

        console.log("🚀 ~ file: updateZoomInfo.js ~ line 13 ~ module.exports= ~ response", response.status)


        return body
    } catch (e) {
        throw (e)
    }
}