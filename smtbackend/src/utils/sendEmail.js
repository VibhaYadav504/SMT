import transporter from "../config/mail.config.js";

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Skill Manthan" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;