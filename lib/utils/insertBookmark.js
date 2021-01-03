const client = require('../client.js');


module.exports = async (bookmarkItem) => {

    console.log(bookmarkItem)
    await client.query(
        `INSERT INTO bookmarks
        (
            chat_id,
            student_id,
            comment
        )
        VALUES
        ($1, $2, $3)
        RETURNING *`,
        [
            bookmarkItem.chatId,
            bookmarkItem.studentId,
            bookmarkItem.comment
        ]
    );

}
