const client = require('../client.js');


module.exports = async (bookmarkItem) => {

    await client.query(
        `INSERT INTO bookmarks
        (
            chat_id,
            student_id,
            comment
        )
        VALUES
        ($1, $2, $3)`,
        [
            bookmarkItem.chatId,
            bookmarkItem.studentId,
            bookmarkItem.comment
        ]
    );

}
