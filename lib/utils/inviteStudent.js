const nodemailer = require('nodemailer');

const inviteAddress = process.env.INVITE_ADDRESS;
const invitePassword = process.env.INVITE_PASSWORD;
const inviteUrl = process.env.INVITE_URL;

module.exports = (inviteEmail, inviteHash) => {

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
        to: inviteEmail,
        subject: "Welcome to AlcheZoomy!",
        text: `Please follow this link: ${inviteUrl}${inviteHash}`,


    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (error) {
            console.log(error);
        }

        console.log(info);
        return ('Email sent: ' + info.response)

    })
}