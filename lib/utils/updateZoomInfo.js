const fetch = require('superagent')

const zoomUrl = process.env.ZOOM_URL

module.exports = async (accessToken, { zoomMeetingId, topic }) => {

    const zoomResponse = await fetch
        .patch(`${zoomUrl}meetings/${zoomMeetingId}/recordings/settings`)
        .set('Authorization', 'Bearer ' + accessToken)
        .send({ topic })

    console.log(zoomResponse)
}