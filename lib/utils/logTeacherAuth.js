const fs = require("fs");
const StreamTransport = require("nodemailer/lib/stream-transport");

module.exports = (req) => {

    let stream = fs.createWriteStream("teacherLog.txt", { flags: 'a' });

    stream.write(new Date().toISOString());
    for (const line in req.headers) {
        stream.write(JSON.stringify(line) + "\n")
    }
    StreamTransport.write("\n\n\n")
    stream.end();
}