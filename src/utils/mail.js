import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { getConfig } from "../config/index.js";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "ECommerce V2",
      link: "https://www.google.com",
    },
  });

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContext);

  // Generate an HTML email with the provided contents
  const emailHtml = mailGenerator.generate(options.mailgenContext);

  const transporter = nodemailer.createTransport({
    service: getConfig.get("SMTPService"),
    host: getConfig.get("SMTPHost"),
    port: getConfig.get("SMTPPort"),
    auth: {
      user: getConfig.get("SMTPUser"),
      pass: getConfig.get("SMTPPass"),
    },
  });

  const mail = {
    from: "mailtrap@demomailtrap.com ",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log(
      "Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file"
    );
    console.log("Error:", error);
  }
};

const emailVerificationMailgenContext = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome onboard",
      action: {
        instructions:
          "To verify your email please click on the following button:",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need Help, or have any questions? just reply to this email, we'd love to help",
    },
  };
};

export { sendEmail, emailVerificationMailgenContext };
