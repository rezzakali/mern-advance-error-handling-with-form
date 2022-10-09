// external imports
import nodemailer from 'nodemailer';

const sendEmailMethod = async (options) => {
  const transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.HOST,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };
  transport.sendEmail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default sendEmailMethod;
