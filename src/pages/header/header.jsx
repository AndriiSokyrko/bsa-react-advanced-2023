import React, {useEffect} from 'react';
import '../assets/css/style.css';
import {Link} from 'react-router-dom';
import AppImg from "../shared/app-img";
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from "react-redux";
import {authActionCreator} from '../../store/actions'

const Header = (props) => {
    const user = useSelector(state => state.auth.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const path = useLocation().pathname
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    const token = localStorage.getItem('TOKEN')


    const handleOnSightOut = () => {
        dispatch(authActionCreator.signOut())
    }


    useEffect(() => {
        if(!token)   navigate(`${path}`);
        if(token) {
            console.log(token)
            navigate('/trips')
        }
    },[auth.user.error, navigate, token, path])

    return (
        <header className="header">
            <div className="header__inner">
                <Link data-test-id="header-logo" to="/trips" className="header__logo">
                    Travel App
                </Link>
                {location.pathname === '/auth/sign-in' || location.pathname === '/auth/sign-up' ? <div></div> :
                <nav data-test-id="header-nav" className="header__nav">
                    <ul className="nav-header__list">
                        <li className="nav-header__item" title="Bookings">
                            <Link
                                data-test-id="header-bookings-link"
                                to="bookings"
                                className="nav-header__inner"
                            >
                                <span className="visually-hidden">Bookings</span>
                                <AppImg src='briefcase.svg'  alt='icon' />

                            </Link>
                        </li>
                        <li className="nav-header__item" title="Profile">
                            <div
                                data-test-id="header-profile-nav"
                                className="nav-header__inner profile-nav"
                                tabIndex="0"
                            >
                                <span className="visually-hidden">Profile</span>
                                <AppImg src='user.svg'  alt='profile icon' />

                                <ul
                                    data-test-id="header-profile-nav-list"
                                    className="profile-nav__list"
                                >
                                    <li
                                        data-test-id="header-profile-nav-username"
                                        className="profile-nav__item profile-nav__username"
                                    >
                                        {user.fullName}
                                    </li>
                                    <li className="profile-nav__item">
                                        <Link
                                            data-test-id="header-profile-nav-sign-out"
                                            to="/auth/sign-in"
                                            className="profile-nav__sign-out button"
                                            onClick={handleOnSightOut}
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
                }
            </div>
        </header>
    );
}

export default Header;