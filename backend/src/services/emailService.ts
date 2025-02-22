import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  constructor() {
    console.log("Email User:", process.env.EMAIL_USER); // Should not be undefined
    console.log("Email Password:", process.env.EMAIL_PASS); // Should not be undefined
    console.log("Frontend URL:", process.env.FRONTEND_URL); // Should not be undefined
  }

  async sendVerificationEmail(email: string, token: string) {
    console.log("i reached here");
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `<p>Click the link below to verify your email:</p><a href="${verificationUrl}">${verificationUrl}</a>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Verification email sent to:", email);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }

  async sendBookingConfirmationEmail(email: string, bookingDetails: any) {
    const { propertyTitle, checkInDate, checkOutDate } = bookingDetails;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Confirmation",
      html: `
        <h1>Booking Confirmation</h1>
        <p>Your booking for ${propertyTitle} has been confirmed.</p>
        <p>Check-in Date: ${new Date(checkInDate).toLocaleDateString()}</p>
        <p>Check-out Date: ${new Date(checkOutDate).toLocaleDateString()}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Booking confirmation email sent to:", email);
    } catch (error) {
      console.error("Error sending booking confirmation email:", error);
    }
  }

  async sendBookingCancellationEmail(email: string, bookingDetails: any) {
    const { propertyTitle, checkInDate, checkOutDate } = bookingDetails;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Cancellation",
      html: `
        <h1>Booking Cancellation</h1>
        <p>Your booking for ${propertyTitle} has been cancelled.</p>
        <p>Check-in Date: ${new Date(checkInDate).toLocaleDateString()}</p>
        <p>Check-out Date: ${new Date(checkOutDate).toLocaleDateString()}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Booking cancellation email sent to:", email);
    } catch (error) {
      console.error("Error sending booking cancellation email:", error);
    }
  }
  
}


export default new EmailService();
