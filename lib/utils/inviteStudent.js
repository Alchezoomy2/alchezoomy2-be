const nodemailer = require('nodemailer');

const inviteAddress = process.env.INVITE_ADDRESS;
const invitePassword = process.env.INVITE_PASSWORD;

module.exports = (inviteEmail, inviteHash) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: inviteAddress,
            pass: invitePassword
        }
    })

    let mailOptions = {
        from: inviteAddress,
        to: inviteEmail,
        subject: "Welcome to AlcheZoomy!",
        text: `Please follow this link: www.alchezoomy.com\invite\${inviteHash}`,


    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            return ('Email sent: ' + info.response)
        }
    })
}