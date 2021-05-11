const nodemailer = require('nodemailer');

const inviteAddress = process.env.INVITE_ADDRESS;
const invitePassword = process.env.INVITE_PASSWORD;
const resetUrl = process.env.STUDENT_RESET_URL;


module.exports = (studentEmail, resetHash) => {
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
        subject: "Password Reset",
        text: `Hi!
        
        Someone requested a password reset for Alchemy Lectures with this email address. 
        
        If that was you, and you would still like to reset your password, please follow this link: 
        ${resetUrl}${resetHash}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Password reset: ' + info.response);

    });
}