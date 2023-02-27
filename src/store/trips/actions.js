import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common.js';
import {notification} from "../../services/services";

const allTrips = createAsyncThunk(
  ActionType.ALL_TRIPS,
  async (payload,{ extra: { services } }) => {
      try{
          const trips = await services.trip.getTrips();
          return trips;
      } catch (e){
          const e_ = JSON.parse(e)
          notification.info(e_.message, 'Info', 1000);
      }
  }
);

const getTripById = createAsyncThunk(
    ActionType.GET_TRIP_BY_ID,
    async (tripId, { extra: { services } }) => {
       try {
            const trip = await services.trip.getTripById(tripId);
            return trip;
       } catch (e){
           const e_ = JSON.parse(e)
           notification.info(e_.message, 'Info', 1000);
       }
  }
);

export {
    allTrips,
    getTripById
};
