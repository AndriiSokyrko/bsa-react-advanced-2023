import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bookingsActionCreator} from '../store/actions'

const Modal = ({trip, onShow, show}) => {
    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.auth)
    const minDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
    const validator = {
        guests: [1, 10],
        date: new Date()
    }
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState({date:null, guests:null})
    const [date, setDate] = useState(minDate);
    const [guests, setGuests] = useState(1);
    const [price, setPrice] = useState(trip.price)
    const handleOnShow = () => {
        onShow({check: true});
    }
    const handleChangeData = (e) => {
        setError({...error, date: null})
        const target = e.target.value;

        if(new Date(target).getTime() < validator.date.getTime()) {
            setError({...error, date: 'Date have to be grater the current date'})
            setDate(target);
            setTimeout(() => {
                setError({...error, date: null})
                setDate(minDate)
            },2000)
            return
        }
        setDate(target);

    }
    const handleChangeGuests = (e) => {
        setError({...error, guests: null})
        const count = e.target.value;
        setGuests(count);
        if(+count<validator.guests[0] || +count>validator.guests[1]) {
            setError({...error, guests: 'Guests have to be 1 - 10'});
            return;
        }
        setPrice(count* trip.price)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isoDate = new Date(date).toISOString()
        const booking = {tripId: trip.id, userId: userSelector.user.id, guests, date:isoDate}
        dispatch(bookingsActionCreator.addBooking(booking))
        onShow({check: true});
    }

    useMemo(() => {
        setDisabled(true);
        if (error.guests === null && error.date === null) setDisabled(false);
    },[error])

    return (
        <div hidden={show.check} >
            <div className="modal">
                <div data-test-id="book-trip-popup" className="book-trip-popup">
                    <button
                        data-test-id="book-trip-popup-close"
                        className="book-trip-popup__close"
                        onClick={handleOnShow}

                    >
                        ×
                    </button>
                    <form className="book-trip-popup__form" autoComplete="off">
                        <div className="trip-info">
                            <h3 data-test-id="book-trip-popup-title" className="trip-info__title">
                                {trip.title}
                            </h3>
                            <div className="trip-info__content">
                <span
                    data-test-id="book-trip-popup-duration"
                    className="trip-info__duration"
                >
                  <strong>{trip.duration}</strong> days
                </span>
                                <span
                                    data-test-id="book-trip-popup-level"
                                    className="trip-info__level"
                                >
                  easy
                </span>
                            </div>
                        </div>
                        <label className="input">
                            <span className="input__heading">Date</span>
                            <input
                                data-test-id="book-trip-popup-date"
                                name="date"
                                type="date"
                                value={date}
                                onChange={handleChangeData}
                                required
                            />
                            <div className={error.date==null ? "hide" : ""}>{error.date}</div>
                        </label>
                        <label className="input">
                            <span className="input__heading">Number of guests</span>
                            <input
                                data-test-id="book-trip-popup-guests"
                                name="guests"
                                type="number"
                                min="1"
                                max="10"
                                value={guests}
                                onChange={handleChangeGuests}
                                required
                            />
                            <div className={error.guests==null ? "hide" : ""}>{error.guests}</div>
                        </label>
                        <span className="book-trip-popup__total">
              Total:
              <output
                  data-test-id="book-trip-popup-total-value"
                  className="book-trip-popup__total-value"
              >
                  {price}$
              </output>
            </span>
                        <button
                            data-test-id="book-trip-popup-submit"
                            className="button"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={disabled}
                        >
                            Book a trip
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;