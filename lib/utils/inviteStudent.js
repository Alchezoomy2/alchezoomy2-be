const nodemailer = require('nodemailer');

const inviteAddress = process.env.INVITE_ADDRESS;
const invitePassword = process.env.INVITE_PASSWORD;
const inviteUrl = process.env.STUDENT_INVITE_URL;
;

module.exports = (studentEmail, inviteHash, userName) => {

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
        subject: "You've been invited!",
        text: `Hi!
        
        You have been invited to join Alchemy Lectures!

        Alchemy Lectures is an alumni built platform to provide a better way to search and save your teacher's Zoom recordings.  When you click the link below you will be asked to set up an account.  The only identifying information you will be asked for is your email address, and a first name.  These are stored to allow your teacher to manage who has access to their lectures.

        ${userName} would like to share their Zoom recordings with you!

        To get started please follow this link: ${inviteUrl}${inviteHash}
        `
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        return ({ response: info.response })
    });

}