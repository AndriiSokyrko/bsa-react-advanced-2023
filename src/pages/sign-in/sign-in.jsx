import React, {useCallback, useEffect, useMemo, useState} from 'react';
import '../assets/css/style.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux/es";
import { authActionCreator } from '../../store/actions.js';
import Spinner from '../spinner/spinner';
import {useNavigate} from "react-router";
import {Message} from '../message/message';

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = localStorage.getItem('TOKEN')
    const [error, setError] = useState({name:null, email:null, password:null})
    const [disabled, setDisabled] = useState(true);
    const auth = useSelector(state => state.auth)

    const [user, setUser] = useState(null);
    const [over, setOver] = useState(false);

    const validator = {
        email: '[a-zA-Z0-9._]{3,30}@[a-zA-Z0-9]{3,10}.[a-zA-Z0-9]{2,5}',
        password: '[a-zA-Z0-9._$@&!]{3,20}'
    }

    const emailValidate = (e) => {
        setError({...error, email: null})
        const email = e.target.value;
        if (!email.match(validator.email)) {
            setError({...error, email: "Email isn't valid"})
            return;
        }
        setUser({...user, email})
    }
    const passwordValidate = useCallback((e) => {
        setError({...error, password: null})
        const password = e.target.value;
        if (!password.match(validator.password)) {
            setError({...error, password: "Password isn't valid"})
            return;
        }
        setUser({...user, password})
    },[error, user, validator.password])

    useMemo(() => {
        setDisabled(true);
        if (error.email === null && error.password === null) setDisabled(false);
    },[error])

    const handleOnSubmit =  useCallback((e) => {
        e.preventDefault();
        setOver(true);
        dispatch(authActionCreator.signIn(user))

    },[dispatch, user])
    useEffect(() => {

        if(auth.user.error) setOver(false)
       if(token) return navigate('/trips')
    },[ navigate, token, auth])

    return (
        <>
            <main className="sign-in-page">
                {over ? <Message children={<><Spinner /></>}/> :
                <>
                    <h1 className="visually-hidden">Travel App</h1>
                    <form className="sign-in-form" autoComplete="off" onSubmit={handleOnSubmit} >
                    <h2 className="sign-in-form__title">Sign In</h2>
                    <label className="input">
                    <span className="input__heading">Email</span>
                    <input
                    data-test-id="auth-email"
                    name="email" type="email"
                    onChange={emailValidate}
                    required
                    />
                    <div className={error.email==null ? "hide" : ""}>{error.email}</div>
                    </label>
                    <label className="input">
                    <span className="input__heading">Password</span>
                    <input
                    data-test-id="auth-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    onChange={passwordValidate}
                    required
                    />
                    <div className={error.password==null ? "hide" : ""}>{error.password}</div>
                    </label>
                    <button data-test-id="auth-submit" className="button" type="submit" disabled={disabled}>
                    Sign In
                    </button>
                    </form>
                    <span>
                    Don't have an account?
                    <Link
                    to="/auth/sign-up"
                    data-test-id="auth-sign-up-link"
                    className="sign-in-form__link"
                    >
                    Sign Up
                    </Link>
                    </span>
                    </>
                }
            </main>
        </>
    );
}

export default SignIn;