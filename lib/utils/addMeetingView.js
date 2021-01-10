const client = require('../client.js');

module.exports = async (meetingId) => {
    await client.query(`
    UPDATE meetings
    SET meeting_views = meeting_views + 1
    WHERE id = $1`,
        [meetingId])

}
