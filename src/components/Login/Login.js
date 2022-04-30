import React, { useState } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateUsername, updateId } from './../../ducks/reducer';

function Login(props) {

    const [loggingIn, setLoggingIn] = useState({
        username: '',
        password: '',
        message: ''
    })

    const navigate = useNavigate();

    async function login() {
        let {username, password } = loggingIn;
        let res = await axios.post('/auth/login', { username, password });
        setLoggingIn({
            username: '', password: '', message: res.data.message
        })
        props.updateUsername(res.data.username)
        props.updateId(res.data.id)
        if (res.data.loggedIn) {
            navigate("/homepage")
        }
    }

    async function register() {
        let { username, password } = loggingIn
        console.log(username)
        let res = await axios.post('/auth/register', { username, password })
        console.log(res.data)
        setLoggingIn({
            username: '', password: '', message: res.data.message
        })
        props.updateUsername(res.data.username)
        props.updateId(res.data.id)
        if (res.data.loggedIn) {
            props.history.push('/homepage')
        }
    }

    function handleChange(event) {
        const {name, value}  = event.target
        setLoggingIn(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className='login-background'>
            <div className='login'>
                <h3>Best of Luck!</h3>
                <div className='username'>
                    <p>Username:
                    <input
                        type="text"
                        name="username"
                        value={loggingIn.username}
                        onChange={handleChange}
                    />
                    </p>
                </div>
                <div className='password'>
                    <p>Password:
                    <input
                        type="text"
                        name="password"
                        value={loggingIn.password}
                        onChange={handleChange}
                    />
                    </p>
                </div>
                <button onClick={() => login()}>Login</button>
                <button onClick={() => register()}>Register</button>
                <p className='login-error'>{loggingIn.message}</p>
            </div>
        </div>
    )
}

// export default Login;

function mapStateToProps(loggingIn) {
    return {...loggingIn}
}

export default connect(mapStateToProps, {updateUsername, updateId})(Login);