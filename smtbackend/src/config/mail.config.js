import nodemailer from "nodemailer";

console.log("MAIL CONFIG");
console.log("HOST =", process.env.EMAIL_HOST);
console.log("PORT =", process.env.EMAIL_PORT);
console.log("USER =", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;