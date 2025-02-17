import { Request, Response } from "express";
import PropertyBookingService from "./../services/PropertyBookingService ";


const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId, renterId, checkInDate, checkOutDate } = req.body;

    const createdBooking = await PropertyBookingService.createBooking(
      propertyId,
      renterId,
      new Date(checkInDate),
      new Date(checkOutDate)
    );

    if (createdBooking.data === null) {
      // Property is already booked
      res.status(400).json(createdBooking);
      return;
    }

    res.status(201).json({
      booking: createdBooking,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error creating booking:", err.message);
    res.status(500).json({
      message: "Error creating booking",
      error: err.message,
    });
  }
};

const confirmBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.id;
    const confirmedBooking = await PropertyBookingService.confirmBooking(
      bookingId
    );

    res.status(200).json({
      message: "Booking confirmed successfully",
      booking: confirmedBooking,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error confirming booking:", err.message);
    res.status(500).json({
      message: "Error confirming booking",
      error: err.message,
    });
  }
};

const cancelBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.id;
    const canceledBooking = await PropertyBookingService.cancelBooking(
      bookingId
    );

    res.status(200).json({
      message: "Booking canceled successfully",
      booking: canceledBooking,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error canceling booking:", err.message);
    res.status(500).json({
      message: "Error canceling booking",
      error: err.message,
    });
  }
};

export { createBooking, confirmBooking, cancelBooking };
