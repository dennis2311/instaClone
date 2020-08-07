import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "instaCloneAdmin@admin.com",
    to: address,
    subject: "Your Secret Words Ready",
    html: `<br>Hello! your login secret word is ${secret}<br>`,
  };

  transporter.sendMail(email, function(error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log(`Email sent : ${info}`);
      return true;
    }
  });
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
