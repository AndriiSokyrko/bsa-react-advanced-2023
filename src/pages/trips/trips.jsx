import React, {useCallback, useEffect, useMemo, useState} from 'react';
import '../assets/css/style.css'
import {Link} from "react-router-dom";
import AppImg from "../shared/app-img";
import CardSearch from "../card-search/card-search";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {tripsActionCreator} from '../../store/actions'
import Spinner from "../spinner/spinner";

const Trips = () => {
    const dispatch = useDispatch();
    const selectorTrips = useSelector(state => state.trips)
    const [data, setData] = useState(selectorTrips.trips);
    const [search, setSearch] = useState(false);
    useMemo(() =>{
        setData(selectorTrips.trips);
    }, [selectorTrips])

    const token = localStorage.getItem('TOKEN')
    const navigate = useNavigate()

    const handleOnSearch = useCallback((search) => {
        setData(selectorTrips.trips);
        setSearch(false);

        let temp = selectorTrips.trips
            if (search.title.length || Object.keys(search.duration).length || search.level.length) {
                if (search.title.length) {
                    const regExpTitle = new RegExp(search.title, 'i')
                    temp = temp.filter(trip => {
                        return trip.title.toLowerCase().match(regExpTitle);
                    })
                    setSearch(true);

                }
                if (Object.keys(search.duration).length) {
                    temp = temp.filter(trip => {
                        return trip.duration > +search.duration.from && trip.duration <= +search.duration.to;
                    })
                    setSearch(true);

                }
                if (search.level.length) {
                    temp = temp.filter(trip => {
                        return trip.level === search.level;
                    })
                    setSearch(true);

                }
                setData(temp);
            }

    },[selectorTrips.trips])



    useEffect(() => {
        dispatch(tripsActionCreator.allTrips())
        if (!token) navigate('/auth/sign-in')
    },[dispatch, navigate, token])

    if (!search && !data.length) {
      return ( <main className="sign-in-page"><Spinner/></main>)
    }
    return (
        <main>
            <>
                 <h1 className="visually-hidden">Travel App</h1>
                <CardSearch onSearch={handleOnSearch}/>
                <section className="trips">
                    {search && !data.length? <main className="sign-in-page"><h2>No data</h2></main> :
                        <>
                            <h2 className="visually-hidden">Trips List</h2>
                            <ul className="trip-list">
                                {data.map(trip => {
                                    return (<li data-test-id="trip-card" className="trip-card" key={trip.id}>
                                        <AppImg dataTestId="trip-details-image" src={trip.image} fromInet={true}
                                                alt='trip-images'/>
                                        <div className="trip-card__content">
                                            <div className="trip-info">
                                                <h3 data-test-id="trip-card-title" className="trip-info__title">
                                                    {trip.title}
                                                </h3>
                                                <div className="trip-info__content">
                <span
                    data-test-id="trip-card-duration"
                    className="trip-info__duration"
                >
                <strong>{trip.duration}</strong> days
                </span>
                                                    <span data-test-id="trip-card-level" className="trip-info__level">
            {trip.level}
                </span>
                                                </div>
                                            </div>
                                            <div className="trip-price">
                                                <span>Price</span>
                                                <strong
                                                    data-test-id="trip-card-price-value"
                                                    className="trip-price__value"
                                                >
                                                    {trip.price} $
                                                </strong>
                                            </div>
                                        </div>
                                        <Link
                                            data-test-id="trip-card-link"
                                            className="button"
                                            to={`/trips/${trip.id}`}
                                        >
                                            Discover a trip
                                        </Link>
                                    </li>)

                                })}
                            </ul>
                        </>
                    }
                </section>
            </>

        </main>
    );
}

export default Trips;