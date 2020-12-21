const client = require('../client.js');

module.exports = async (meetingId) => {
    const { rows } = await client.query(`
    UPDATE meetings
    SET meeting_views = meeting_views + 1
    WHERE id = $1
    RETURNING *
    `, [meetingId])

}
