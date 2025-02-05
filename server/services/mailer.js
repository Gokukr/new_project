"use strict";
const nodemailer = require("nodemailer");

function sendmail(receiveremailid, subjectline, emailbody) {
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.googlemail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: "Recipe Management Site",
      to: receiveremailid,
      subject: subjectline,
      text: emailbody,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  });
}

module.exports.sendmail = sendmail;
