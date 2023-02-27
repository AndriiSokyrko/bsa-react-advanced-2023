import { Booking } from './bookings/booking.service.js';
import { Trip } from './trips/trip.service.js';
import { Auth } from './auth/auth.service.js';
import { Http } from './http/http.service.js';
import { Storage } from './storage/storage.service.js';
import { Notification } from './notification/notification.service';
const rootPath = process.env.REACT_APP_ROOT_PATH;
const storage = new Storage({
    storage: localStorage
});
const notification = new Notification();

const http = new Http({
    storage
});

const auth = new Auth({
    apiPath: rootPath +'/auth/',
    http
});

const trip = new Trip({
    apiPath: rootPath+'/trips/',
    http
});

const booking = new Booking({
    apiPath: rootPath+'/bookings/',
    http
});

export { http, storage, auth, trip, booking, notification};