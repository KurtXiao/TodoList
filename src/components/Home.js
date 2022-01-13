import React from "react";
import '../styles/Home.css';
import { postToServer } from '../utils/server';
import { withRouter } from "react-router";
import store from '../store';
import { setUsername } from '../actions/userInfo';
import { INVALID_USERNAME, WRONG_PASSWORD} from '../utils/constants';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    async login() {
        let username = this.state.username;
        let password = this.state.password;
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
        this.props.history.push('/Interface');
    }
    async register() {
        let username = this.state.username;
        let password = this.state.password;
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
        this.props.history.push('/Interface');
    }
    render() {
        return <div className="home-wrapper">
            <p className="phrase-I">HAPPINESS IS</p>
            <p className="phrase-II">...finishing a to-do list.</p>
            <span className="cue-word">Username</span>
            <input name="username" onChange={this.handleInputChange.bind(this)} className="user-input"/>
            <span className="cue-word">Password</span>
            <input name="password" onChange={this.handleInputChange.bind(this)} className="user-input"/>
            <button onClick={this.login.bind(this)} className="log-in">Log in</button>
            <button onClick={this.register.bind(this)} className="sign-up">Sign up</button>
        </div>
    }
}

export default withRouter(Home);