const fetch = require('superagent')

const zoomUrl = process.env.ZOOM_URL

module.exports = async (accessToken, { zoomMeetingId, topic }) => {

    await fetch
        .patch(`${zoomUrl}meetings/${zoomMeetingId}/recordings/settings`)
        .set('Authorization', 'Bearer ' + accessToken)
        .send({ topic })

}