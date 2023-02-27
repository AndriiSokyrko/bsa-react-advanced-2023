import {createAsyncThunk} from "@reduxjs/toolkit";
import {ActionType} from "./common";
import {notification} from "../../services/services";

const allBookings = createAsyncThunk(
  ActionType.ALL_BOOKINGS,
  async (payload,{ extra: { services } }) => {
      try {
          const bookings = await services.booking.allBookings();
          return bookings;
      } catch (e){
          const e_ = JSON.parse(e)
          notification.info(e_.message, 'Info', 1000);
      }
  }
);
const addBooking = createAsyncThunk(
  ActionType.ADD_BOOKING,
  async (payload, { extra: { services } }) => {
      try {
          const booking = await services.booking.addBooking(payload);
          return booking;
      } catch (e){
          const e_ = JSON.parse(e)
          notification.info(e_.message, 'Info', 1000);
      }
  }
);
const deleteBooking = createAsyncThunk(
    ActionType.DELETE_BOOKING_BY_ID,
    async (id, { extra: { services } }) => {
        try {
            await services.booking.deleteBookingById(id);
            return {id, message: 'Booking was canceled'};
        } catch (e){
            notification.info(e.message, 'Info', 1000);
        }
    }
);
const getBookingById = createAsyncThunk(
    ActionType.GET_BOOKING_BY_ID,
    async (payload, { extra: { services } }) => {
       try {
            const booking = await services.booking.getBookingById(payload);
            return booking;
       } catch (e){
           notification.info(e.message, 'Info', 1000);
       }
    }
);
export {
    allBookings,
    addBooking,
    deleteBooking,
    getBookingById
};
