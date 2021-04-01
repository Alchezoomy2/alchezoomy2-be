const fs = require("fs");
const StreamTransport = require("nodemailer/lib/stream-transport");

module.exports = (title, object) => {

    let stream = fs.createWriteStream("teacherLog.txt", { flags: 'a' });

    stream.write(`****//// ${title} ////****\n`)
    stream.write(new Date().toISOString() + "\n");
    for (const line in object) {
        stream.write(`${line}: ${object[line]}\n`)
    }
    stream.write("\n\n\n")
    stream.end();
}