const client = require('../client.js');

const client = require('../client.js');


module.exports = async (chatId, studentId) => {

    await client.query(
        `INSERT INTO bookmarks
        (
            chat_id,
        student_id
        )
        VALUES
        ($1, $2)
        RETURNING *`,
        [
            chatId,
            studentId
        ]
    );

}
