const client = require('../client.js');


module.exports = async (chat) => {
    const response = ';'
    if (chat.bookmark) {
        response = await client.query(`
        UPDATE chats
        SET bookmark = false
        WHERE id = $1
        RETURNING *`,
            [chat.id]);
    }
    else {
        response = await client.query(`
        UPDATE chats
        SET bookmark = true
        WHERE id = $1
        RETURNING *`,
            [chat.id]);
    }
    console.log(response.rows[0]);
}