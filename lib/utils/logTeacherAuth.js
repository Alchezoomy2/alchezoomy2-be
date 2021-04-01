const fs = require("fs")

module.exports = (req) => {

    let stream = fs.createWriteStream("teacherLog.txt", { flags: 'a' });

    stream.write(new Date().toISOString());
    stream.write(JSON.stringify(req.headers) + "\n")
    stream.end();
}