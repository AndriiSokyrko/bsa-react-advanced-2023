import React, {useEffect, useMemo, useState} from 'react';
import '../assets/css/style.css';
import {bookingsActionCreator} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Spinner from "../spinner/spinner";
const Bookings = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('TOKEN')
    const navigate = useNavigate()
    const selectorBookings = useSelector(state => state.bookings)
    const [data, setData] = useState(selectorBookings);
    const [loading, setLoading] =  useState(true)
    useMemo(() => {
        setData(selectorBookings.bookings);
        setLoading(false)
    }, [selectorBookings])


    const handleCancel = (e) => {
        const id = e.target.id;
        dispatch(bookingsActionCreator.deleteBooking(id))
    }
    useEffect(() => {
        dispatch(bookingsActionCreator.allBookings())
        if (!token) navigate('/auth/sign-in')
    },[dispatch, navigate, token])
    if(!data.length && loading){
        return <main className="bookings-page">
            <Spinner />

        </main>
    }
    return (
        <main className="bookings-page">
            <h1 className="visually-hidden">Travel App</h1>
            <ul className="bookings__list">
                {!data.length && !loading ?  <h2>No bookings</h2>:
                    data.map(booking => {
                    return <li data-test-id="booking" className="booking" key={booking.id}>
                        <h3 data-test-id="booking-title" className="booking__title">{booking.trip.title}</h3>
                        <span data-test-id="booking-guests" className="booking__guests">
                            {booking.guests} guests
          </span>
                        <span data-test-id="booking-date" className="booking__date">
                            {booking.date.split('T')[0]}
          </span>
                        <span data-test-id="booking-total" className="booking__total">
                            {booking.trip.price} $
          </span>
                        <button
                            data-test-id="booking-cancel"
                            className="booking__cancel"
                            title="Cancel booking"
                            id={booking.id}
                            onClick={handleCancel}
                        >
                            <span className="visually-hidden" >Cancel booking</span>
                            ×
                        </button>
                    </li>
                })
                }

            </ul>
        </main>
    );
}

export default Bookings;