import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetPasswordEmail = async (to, resetUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'RetinaScan Password Reset',
    html: `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your RetinaScan password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #1D4ED8; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};