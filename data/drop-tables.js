const client = require('../lib/client');

run();

async function run() {

  try {
    await client.connect();

    await client.query(`
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS meetings CASCADE;
            DROP TABLE IF EXISTS transcripts CASCADE;
            DROP TABLE IF EXISTS chats CASCADE;
            DROP TABLE IF EXISTS favorites;
        `);

    console.log(' drop tables complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}
