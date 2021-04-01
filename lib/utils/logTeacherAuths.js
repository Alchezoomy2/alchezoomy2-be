const fs = require("fs")

export default async function logTeacherAuth(req) {

    let stream = fs.createWriteStream("teacherLog.txt", { flags: 'a' });
    console.log(new Date().toISOString());
    [...Array(10000)].forEach(function (item, index) {
        stream.write(index + "\n");
    });
    console.log(new Date().toISOString());
    console.log(req)
    stream.end();
}