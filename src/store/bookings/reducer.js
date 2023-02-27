import { createReducer } from '@reduxjs/toolkit';
import {
  allBookings,
  deleteBooking,
  addBooking, getBookingById
} from './actions.js';

const initialState = {
  bookings: []
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(allBookings.fulfilled, (state, action) => {
    const bookings = action.payload;
    state.bookings = bookings.sort((a, b) => (new Date(a.date).getTime() < (new Date(b.date).getTime())? 1: -1));
  });

  builder.addCase(deleteBooking.fulfilled, (state, action) => {
    const {id} = action.payload;
    state.bookings = state.bookings.filter(booking => booking.id !==id);
  });

  builder.addCase(getBookingById.fulfilled, (state, action) => {
    const booking = action.payload;
    state.bookings = [...state.bookings, booking]
  });

  builder.addCase(addBooking.fulfilled, (state, action) => {
    const booking = action.payload;
    state.bookings = [...state.bookings, booking ];
  });

})

export { reducer };
