import nodemailer from "nodemailer";

import Logger from "./Logger";
import dotenv from "dotenv";
dotenv.config();

const log = new Logger();

const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  const { ECDYSIS_EMAIL, ECDYSIS_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ECDYSIS_EMAIL,
      pass: ECDYSIS_PASSWORD,
    },
  });

  try {
    const testResponse = await transporter.verify();
    log.warning("Connected to email server", testResponse);
  } catch (error) {
    log.error("Error connecting to email server", error);
    return null;
  }
  try {
    const sendResponse = await transporter.sendMail({
      priority: "high",
      from: ECDYSIS_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log("Email sent", sendResponse);
    return "Email sent";
  } catch (error) {
    console.error("Error sending email", error);
    return null;
  }
};

export default sendEmail;
