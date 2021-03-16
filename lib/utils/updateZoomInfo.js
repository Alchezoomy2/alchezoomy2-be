const fetch = require('superagent')

const zoomUrl = process.env.ZOOM_URL

export default function updateZoomInfo(accessToken, { ZoomMeetingId, topic }) {
    const zoomResponse = await fetch
        .patch(`${zoomUrl}meetings/${ZoomMeetingId}`)
        .set('Authorization', 'Bearer ' + accessToken)
        .send({ topic })


    console.log("🚀 ~ file: updateZoomInfo.js ~ line 10 ~ updateZoomInfo ~ zoomResponse", zoomResponse)

    return zoomResponse;
}