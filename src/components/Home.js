import React, { useState } from "react";
import '../styles/Home.css';
import { postToServer } from '../utils/server';
import { withRouter } from "react-router";
import store from '../store';
import { setUsername } from '../actions/userInfo';
import { INVALID_USERNAME, WRONG_PASSWORD} from '../utils/constants';
import Snowflakes from './Snowflakes';

const Home = (props) => {
    const [username, setStateUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleInputChange(e) {
        if(e.target.name === 'username') setStateUsername(e.target.value);
        else setPassword(e.target.value);
    }

    async function login() {
        if(username === '' || password === '') {
            alert('Username and password must not be empty!');
            return;
        }
        let res = await postToServer('/login', {username: username, password: password});
        if(res === WRONG_PASSWORD) {
            alert("Invalid password!");
            return;
        }
        if(res === INVALID_USERNAME) {
            alert("Invalid username!");
            return;
        }
        await store.dispatch(setUsername(username));
        props.history.push('/Interface');
    }
    async function register() {
        if(username === '' || password === '') {
            alert('Username and password must not be empty!');
            return;
        }
        let res = await postToServer('/register', {username: username, password: password});
        if(!res) {
            alert('Username has been taken!');
            return;
        }
        await store.dispatch(setUsername(username));
        props.history.push('/Interface');
    }
    return <div>
        <Snowflakes />
        <div className="home-wrapper">
            <p className="phrase-I">HAPPINESS IS</p>
            <p className="phrase-II">...finishing a to-do list.</p>
            <span className="cue-word">Username</span>
            <input name="username" onChange={(e) => handleInputChange(e)} className="user-input"/>
            <span className="cue-word">Password</span>
            <input name="password" onChange={(e) => handleInputChange(e)} className="user-input"/>
            <button onClick={() => login()} className="log-in">Log in</button>
            <button onClick={() => register()} className="sign-up">Sign up</button>
        </div>
    </div>
}

export default withRouter(Home);