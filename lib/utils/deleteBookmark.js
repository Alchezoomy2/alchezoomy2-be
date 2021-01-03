const client = require('../client.js');


module.exports = async (bookmarkId) => {

    await client.query(
        `DELETE FROM bookmarks
        WHERE id = $1`,
        [bookmarkId]);

}