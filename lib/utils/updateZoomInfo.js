const fetch = require('superagent')

const zoomUrl = process.env.ZOOM_URL

module.exports = async (accessToken, { zoomMeetingId, topic }) => {
    console.log("🚀 ~ file: updateZoomInfo.js ~ line 6 ~ module.exports= ~ accessToken", `${zoomUrl}meetings/${zoomMeetingId}`)
    console.log("🚀 ~ file: updateZoomInfo.js ~ line 6 ~ module.exports= ~ ZoomMeetingId, topic ", zoomMeetingId, { topic })

    const zoomResponse = await fetch
        .patch(`${zoomUrl}meetings/82887058065`)
        .set('Authorization', 'Bearer ' + accessToken)
        .send({ topic })


    console.log("🚀 ~ file: updateZoomInfo.js ~ line 10 ~ updateZoomInfo ~ zoomResponse", zoomResponse)

    return zoomResponse;
}