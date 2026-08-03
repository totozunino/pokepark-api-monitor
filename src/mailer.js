import nodemailer from "nodemailer";
import { config } from "./config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.gmailUser,
    pass: config.gmailAppPassword,
  },
});

export async function verifyEmailConnection() {
  await transporter.verify();
}

export async function sendAvailabilityEmail(date, products) {
  const productText = products
    .map(
      (product) =>
        `${product.productName}\n` +
        `Product ID: ${product.productId}\n` +
        `Stock state: ${product.stockState}`
    )
    .join("\n\n");

  await transporter.sendMail({
    from: config.gmailUser,
    to: config.notificationEmail,
    subject: `PokéPark tickets may be available: ${date}`,
    text: [
      `PokéPark returned ticket products for ${date}.`,
      "",
      productText,
      "",
      "Open the ticket page immediately:",
      config.ticketPageUrl,
    ].join("\n"),
  });
}
