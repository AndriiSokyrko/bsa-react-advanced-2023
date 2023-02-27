import React, {useEffect, useState} from 'react';
import AppImg from "../shared/app-img";
import {useParams} from "react-router";
import Modal from "../../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {tripsActionCreator} from '../../store/actions'
import Spinner from "../spinner/spinner";

const CardTrip = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState({check: true})
    const { tripId } = useParams();
    const trip = useSelector(state => state.trips.tripById)
    const handleShow = (par= {check: true}) => {
        setShow(par);
    }
useEffect(() => {
    dispatch(tripsActionCreator.getTripById(tripId))

},[dispatch, tripId])
    return (
    <>
         <main className="bookings-page ">
            <h1 className="visually-hidden">Travel App</h1>
             {!trip || !Object.keys(trip).length ? <div className="spinner-center"><Spinner /></div> :
                 <>
                 <div className="trip">

                     <AppImg dataTestId="trip-details-image" src={trip.image} fromInet={true} className="trip__img"
                             alt='trip-images'/>

                     <div className="trip__content">
                         <div className="trip-info">
                             <h3 data-test-id="trip-details-title" className="trip-info__title">
                                 {trip.title}
                             </h3>
                             <div className="trip-info__content">
              <span
                  data-test-id="trip-details-duration"
                  className="trip-info__duration"
              >
                <strong>{trip.duration}</strong> days
              </span>
                                 <span data-test-id="trip-details-level" className="trip-info__level">
                                {trip.level}
              </span>
                             </div>
                         </div>
                         <div
                             data-test-id="trip-details-description"
                             className="trip__description"
                         >
                             {trip.description}
                         </div>
                         <div className="trip-price">
                             <span>Price</span>
                             <strong
                                 data-test-id="trip-details-price-value"
                                 className="trip-price__value"
                             >
                                 {trip.price} $
                             </strong>
                         </div>
                         <button
                             data-test-id="trip-details-button"
                             className="trip__button button"
                             onClick={handleShow}
                         >
                             Book a trip
                         </button>
                     </div>
                 </div>
                 <Modal trip={trip} onShow={handleShow} show={show}/>
                </>
             }
        </main>
        {/*<Modal trip={trip} onShow={handleShow} show={show}/>*/}
    </>

    );
}

export default CardTrip;