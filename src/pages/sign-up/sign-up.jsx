import React, {useCallback, useEffect, useMemo, useState} from 'react';
import '../assets/css/style.css';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {authActionCreator} from '../../store/actions';
import Spinner from "../spinner/spinner";
import {Message} from "../message/message";
import {useNavigate} from "react-router";


const SignUp = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = localStorage.getItem('TOKEN')
    const [over, setOver] = useState(false);
    const auth = useSelector(state => state.auth)
    const [user, setUser] = useState()
    const [error, setError] = useState({name:null, email:null, password:null})
    const [disabled, setDisabled] = useState(true);
    const validator = {
        name: '[a-zA-Z0-9.]{3,20}',
        email: '[a-zA-Z0-9.]{3,30}@[a-zA-Z0-9]{3,10}.[a-zA-Z0-9]{2,5}',
        password: '[a-zA-Z0-9._$@&!]{3,20}'
    }
    const nameValidate = (e) => {

        setError({...error, name: null})
        const name = e.target.value;
        let regexp = new RegExp(validator.name,"i");
        if (!name.match(regexp)) {
            setError({...error, name: "Name isn't valid"})
            return;
        }
        setUser({...user, fullName:name})
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
    const passwordValidate = (e) => {
        setError({...error, password: null})
        const password = e.target.value;
        if (!password.match(validator.password)) {
            setError({...error, password: "Password isn't valid"})
            return;
        }
        setUser({...user, password})

    }

    useMemo(() => {
        setDisabled(true);
        if (error.name === null && error.email === null && error.password === null) setDisabled(false);
    },[error])

    const handleOnSubmit =  useCallback((e) => {
        e.preventDefault();
        setOver(true);
        dispatch(authActionCreator.signUp(user))
    },[dispatch, user])

    useEffect(() => {
        setOver(false)
        if(auth.user.error){
            dispatch(authActionCreator.clearError())
        }
        if(auth.user.id || token) navigate('/trips')
    },[dispatch, token, auth, navigate])


    return (
        <main className="sign-up-page" onSubmit={handleOnSubmit}>
            {over ?  <Message children={<><Spinner /></>}></Message> :
                <>
                    <h1 className="visually-hidden">Travel App</h1>
                    <form className="sign-up-form" autoComplete="off">
                        <h2 className="sign-up-form__title">Sign Up</h2>
                        <label className="input">
                            <span className="input__heading">Full name</span>
                            <input
                                data-test-id="auth-full-name"
                                name="full-name"
                                type="text"
                                required
                                onChange={nameValidate}
                            />
                            <div className={error.name == null ? "hide" : ""}>{error.name}</div>
                        </label>
                        <label className="input">
                            <span className="input__heading">Email</span>
                            <input
                                data-test-id="auth-email"
                                name="email"
                                type="email"
                                onChange={emailValidate}
                                required
                            />
                            <div className={error.email == null ? "hide" : ""}>{error.email}</div>

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
                            <div className={error.password == null ? "hide" : ""}>{error.password}</div>

                        </label>
                        <button data-test-id="auth-submit" className="button" type="submit" disabled={disabled}
                                onSubmit={handleOnSubmit}>
                            Sign Up
                        </button>
                    </form>
                    <span>
        Already have an account?
        <Link to="/sign-in"
              data-test-id="auth-sign-in-link"
              className="sign-up-form__link"
        >Sign In</Link
        >
      </span>
                </>
            }
        </main>
    );
}

export default SignUp;