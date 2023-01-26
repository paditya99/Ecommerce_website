const nodeMailer=require('nodemailer');
const {SMPT_MAIL,SMPT_PASSWORD,SMPT_SERVICE}=require('../config/config.json');

const sendEmail=async(options)=>{
    const transporter=nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: SMPT_SERVICE,
        auth: {
            user: SMPT_MAIL,
            pass: SMPT_PASSWORD
        }
    })

    const mailOptions={
        from: SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;