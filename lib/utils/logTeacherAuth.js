const fs = require("fs");
const StreamTransport = require("nodemailer/lib/stream-transport");

module.exports = (req) => {

    let stream = fs.createWriteStream("teacherLog.txt", { flags: 'a' });

    stream.write(new Date().toISOString() + "\n");
    for (const line in req.headers) {
        stream.write(`${line}: ${req.headers[line]}\n`)
    }
    stream.write("\n\n\n")
    stream.end();
}