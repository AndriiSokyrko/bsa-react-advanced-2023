import { configureStore } from '@reduxjs/toolkit';
import { http, storage, auth, trip, booking } from '../services/services.js';
import { bookingsReducer, authReducer, tripsReducer } from './root-reducer.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
    bookings: bookingsReducer,
  },
  middleware: getDefaultMiddleware => (getDefaultMiddleware({
    thunk: {
      extraArgument: {
        services: {
          http,
          storage,
          auth,
          trip,
          booking
        }
      }
    }
  }))

});

export { store };
