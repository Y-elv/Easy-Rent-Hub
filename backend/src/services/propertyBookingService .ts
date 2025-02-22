import Booking from "../models/booking";
import Property from "../models/property";
import { Op } from "sequelize";
import EmailService from "../services/emailService";
import UserService from "../services/userService";
import propertyService from "./propertyService";

class PropertyBookingService {

 async createBooking(
    propertyId: string,
    renterId: string,
    checkInDate: Date,
    checkOutDate: Date,

  ) {
    try {
      console.log("Request received with:", checkInDate, checkOutDate);

      // Fetch confirmed bookings for the same property
      const overlappingBookings = await Booking.findAll({
        where: {
          propertyId,
          status: "pending",
          [Op.and]: [
            {
              [Op.or]: [
                { checkInDate: { [Op.between]: [checkInDate, checkOutDate] } }, // New check-in falls within an existing booking
                { checkOutDate: { [Op.between]: [checkInDate, checkOutDate] } }, // New check-out falls within an existing booking
                {
                  checkInDate: { [Op.lte]: checkInDate },
                  checkOutDate: { [Op.gte]: checkOutDate },
                }, // Existing booking fully covers the new booking
              ],
            },
          ],
        },
      });

      console.log("Found overlapping bookings:", overlappingBookings);

      // If there's any overlap, return a conflict message along with the overlapping booking dates
      if (overlappingBookings.length > 0) {
        const overlappingDates = overlappingBookings.map(booking => ({
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate
        }));
        
        console.log("Property is already booked for the selected dates.");
        return {
          message:
            "The property is already booked for the selected dates. Try different dates.",
          data: null,
          overlappingDates,
        };
      }

      // Create the booking with 'pending' status if no overlap
      const booking = await Booking.create({
        propertyId,
        renterId,
        checkInDate,
        checkOutDate,
        status: "pending",
        
      });

      return {
        message: "Booking created successfully, awaiting confirmation",
        data: booking,
      };
    } catch (error) {
      console.error("Error creating booking:", error);
      throw new Error(`Error creating booking: ${error}`);
    }
 }

  // Function to confirm a booking
  async confirmBooking(bookingId: string) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (!booking) throw new Error("Booking not found.");

      // Change the booking status to 'confirmed'
      booking.status = "confirmed";
      await booking.save();

      // Update property availability
      await Property.update(
        { propertyAvailable: false },
        { where: { id: booking.propertyId } }
      );
        const renterEmail = await UserService.getUserEmailById(
          booking.renterId
        );
        const propertyTitle = await propertyService.getPropertyTitleById(
          booking.propertyId
        );
        console.log(
          "Renter email:",
          renterEmail,
          "Property title:",
          propertyTitle
        );
        const bookingDetails = {
          propertyTitle: propertyTitle, // You might want to fetch the actual property title from the database
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
        };
        await EmailService.sendBookingConfirmationEmail(
          renterEmail,
          bookingDetails
        );

      return booking;
    } catch (error) {
      throw new Error(`Error confirming booking: ${error}`);
    }
  }

  // Function to cancel a booking
  async cancelBooking(bookingId: string) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (!booking) throw new Error("Booking not found.");

      // Change status to 'canceled'
      booking.status = "canceled";
      await booking.save();

      await Property.update(
        { propertyAvailable: true },
        { where: { id: booking.propertyId } }
      );
        const renterEmail = await UserService.getUserEmailById(
          booking.renterId
        );
        const propertyTitle = await propertyService.getPropertyTitleById(
          booking.propertyId
        );
        console.log(
          "Renter email:",
          renterEmail,
          "Property title:",
          propertyTitle
        );
        const bookingDetails = {
          propertyTitle: propertyTitle, // You might want to fetch the actual property title from the database
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
        };
        await EmailService.sendBookingCancellationEmail(
          renterEmail,
          bookingDetails
        );

      return booking;
    } catch (error) {
      throw new Error(`Error canceling booking: ${error}`);
    }
  }

  // Function to fetch where status is pending
  async getPendingBookings() {
    try {
      return await Booking.findAll({
        where: { status: "pending" }
      });
    } catch (error) {
      throw new Error(`Error fetching pending bookings: ${error}`);
    }
  }


}

export default  new PropertyBookingService();
