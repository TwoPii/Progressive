import React, { Component } from 'react';
import './Login.css'
import axios from 'axios'

class Login extends Component {
    // Adds a class constructor that assigns the initial state values:
    constructor () {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }
    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount () {

    }
    componentDidMount() {

    }
    // The render method contains the JSX code which will be compiled to HTML.
    render() {
        return (
            <div className="login-box">
                <input id="user-name" type="text" />
                <input id="password" type="password" />
                <div id="button" onClick={() => this.submit()}>
                  LogIn
                </div>
            </div>
        );
    }

  submit() {
      let username = document.getElementById('user-name').value;
      let password = document.getElementById('password').value;
      let body = {
        username: username,
        password: password
      };
      axios.post(
        'http://localhost:5000/login',
        body,
        {
          headers: {
              'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        let token = response.data.token;
        axios.get(
          'http://localhost:5000/info',
          {
            headers: {
              'Content-Type': 'application/json',
              'access-token': token
            }
          }
        ).then(response => { console.log(response)})
      });
    }
}

export default Login;
