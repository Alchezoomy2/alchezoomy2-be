const nodemailer = require('nodemailer');

const inviteAddress = process.env.INVITE_ADDRESS;
const invitePassword = process.env.INVITE_PASSWORD;
const inviteUrl = process.env.INVITE_URL;

module.exports = (studentEmail, teacherEmail, inviteHash) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: inviteAddress,
            pass: invitePassword
        }
    })

    let mailOptions = {
        from: inviteAddress,
        to: studentEmail,
        subject: "Welcome to AlcheZoomy!",
        text: `Hi!
        
        You have been invited to join AlcheZoomy!
        Please follow this link: ${inviteUrl}${inviteHash}
        `
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        console.log(info);
        return ({ response: info.reponse })
    });
}