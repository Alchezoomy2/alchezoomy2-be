const fetch = require('superagent')

const zoomUrl = process.env.ZOOM_URL

module.exports = async (accessToken, { zoomMeetingId, topic }) => {
    console.log("🚀 ~ file: updateZoomInfo.js ~ line 6 ~ module.exports= ~ accessToken", `${zoomUrl}meetings/${zoomMeetingId}`)
    console.log("🚀 ~ file: updateZoomInfo.js ~ line 6 ~ module.exports= ~ ZoomMeetingId, topic ", zoomMeetingId, { topic })


    const getResponse = await fetch
        .get(`${zoomUrl}meetings/${zoomMeetingId}`)
        .set('Authorization', 'Bearer ' + accessToken)

    console.log(getResponse)

    const zoomResponse = await fetch
        .patch(`${zoomUrl}meetings/${zoomMeetingId}`)
        .set('Authorization', 'Bearer ' + accessToken)
        .send({ topic })


    console.log("🚀 ~ file: updateZoomInfo.js ~ line 10 ~ updateZoomInfo ~ zoomResponse", zoomResponse.status)

    return zoomResponse;
}