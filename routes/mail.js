import nodemailer from 'nodemailer';
import env from 'dotenv';

env.config();

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: {rejectUnauthorized: false}, 
  });
  
  export const mailOptions = {
    from:process.env.EMAIL,
    to: '',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };