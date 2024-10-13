import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASS,
  },
});

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    
    return "success";
  } catch (error) {
    console.error("Error sending email:", error);
  }
  
  return "failed";
};

export default sendEmail;