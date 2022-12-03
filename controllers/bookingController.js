const { default: mongoose } = require("mongoose");
const { parse } = require("path");
var BookingRequest = require("../models/bookingRequest.js");


// Create a new booking from the incomming mqtt message.
class ClinicBookingController {
  createBooking = async (booking) => {
    try {
      const { user: {email, name}, clinicId, issuance, date, state, start, end, details } = booking;
      booking = new BookingRequest({
        user: {
          email: email,
          name: name
        },
        clinicId: clinicId,
        issuance: issuance,
        date: date,
        state: state,
        start: start,
        end: end,
        details: details
      });

      booking.save((err) => {
        if (err) return console.log(err);
        else
        return booking
      });
      return '{message: ' + booking;
    } catch (error) {
      console.log(error);
    }
  };
  
// Function changes the state field to 'approved', it finds it by id.

  approveBooking = async (request) => {
    try {
      const { _id } = request;

      BookingRequest.findById(_id, function (err, bookingRequest) {
        if (err) {
          return next(err);
        }
        if (!bookingRequest) {
          return (res = { message: "Booking request was not found" });
        }
        bookingRequest.state = "approved";
        bookingRequest.save();
      });
      return {message: "Booking request has been approved"}

    } catch (error) {
      console.log(error);
    }
  };


// Function changes the state field to 'denied', it finds it by id.
  denieBooking = async (request) => {
    try {
      const { _id } = request;

      BookingRequest.findById(_id, function (err, bookingRequest) {
        if (err) {
          return next(err);
        }
        if (!bookingRequest) {
          return (res = { message: "Booking request was not found" });
        }
        bookingRequest.state = "denied";
        bookingRequest.save();
      });
      return {message: "Booking request has been denied"}

    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = ClinicBookingController;