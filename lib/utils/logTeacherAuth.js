const fs = require("fs")

module.exports = (req) => {

    let stream = fs.createWriteStream("teacherLog.txt", { flags: 'a' });
    console.log(new Date().toISOString());
    [...Array(100)].forEach(function (item, index) {
        stream.write(index + "\n");
    });
    stream.write(new Date().toISOString());
    stream.write(JSON.stringify(req.headers))
    // console.log(req)
    stream.end();
}