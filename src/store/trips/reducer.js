import { createReducer } from '@reduxjs/toolkit';
import {
   allTrips,
    getTripById
} from './actions.js';

const initialState = {
  trips: [],
  tripById: null
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(allTrips.fulfilled, (state, action) => {
    state.trips  = action.payload;
  });

  builder.addCase(getTripById.fulfilled, (state, action) => {
    state.tripById = action.payload;
  });

});

export { reducer };
