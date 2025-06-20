const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anthonytrinh0508@gmail.com',
    pass: 'egbniahjaexobpar'
  }
});

let mailOptions = {
  from: 'anthonytrinh0508@gmail.com',
  to: 'anthonytrinh0508@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email from Nodemailer.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});