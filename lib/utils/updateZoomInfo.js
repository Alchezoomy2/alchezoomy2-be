const fetch = require('superagent')

const zoomUrl = process.env.ZOOM_URL;

module.exports = async (access_token, zoom_meeting_id, topic) => {
    try {
        const { body } = await fetch
            .patch(`${zoomUrl}meetings/${zoom_meeting_id}/recordings/settings`)
            .set('Authorization', 'Bearer ' + access_token)
            .send({ topic })

        return body
    } catch (e) {
        throw (e)
    }
}