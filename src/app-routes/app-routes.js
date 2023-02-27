import React from 'react';
import SignIn from "../pages/sign-in/sign-in";
import SignUp from "../pages/sign-up/sign-up";
import Trips from "../pages/trips/trips";
import Bookings from "../pages/bookings/bookings";
import Layout from "../pages/Layout";
import CardTrip from "../pages/card-trip/card-trip";
import Modal from "../modal/modal";
import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<SignIn />} />
                <Route path="auth/sign-in" element={<SignIn />} />
                <Route path="auth/sign-up" element={<SignUp />} />
                <Route path="trips/:tripId" element={<CardTrip />} />
                <Route path="trips" element={<Trips />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:bookingId" element={<Modal />} />
                <Route path="*" element={<SignIn />} />
            </Route>
        </Routes>
    )
 }

export default AppRoutes;