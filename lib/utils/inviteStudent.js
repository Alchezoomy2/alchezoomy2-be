const nodemailer = require('nodemailer');

const inviteAddress = process.env.INVITE_ADDRESS;
const invitePassword = process.env.INVITE_PASSWORD;
const inviteUrl = process.env.INVITE_URL;

module.exports = (studentEmailArray, inviteHash) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: inviteAddress,
            pass: invitePassword
        }
    })

    studentEmailArray.forEach(studentEmail => {
        let mailOptions = {
            from: inviteAddress,
            to: studentEmail,
            subject: "Welcome to Alchemy Lectures!",
            text: `Hi!
        
        You have been invited to join Alchemy Lectures!!
        Please follow this link: ${inviteUrl}${inviteHash}
        `
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            return ({ response: info.response })
        });
    })
}