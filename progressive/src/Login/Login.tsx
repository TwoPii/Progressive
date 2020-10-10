import React, { Component } from 'react';
import './Login.css'
import axios from 'axios'


interface ILoginProperties {
  obtainToken: (token: string) => void;
}

export class Login extends Component<ILoginProperties> {
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

    private async submit() {
      let username = (document.getElementById('user-name') as HTMLInputElement).value;
      let password = (document.getElementById('password') as HTMLInputElement).value;
      let body = {
        username: username,
        password: password
      };
      let response = await axios.post(
        'http://localhost:5000/login',
        body,
        {
          headers: {
              'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json'
          }
        }
      );
      console.log(response);
      if (response.status !== 200 || response.data.error) console.log('ERROR');
      else {
        let token = response.data.token;
        this.props.obtainToken(token);
      }
    }
}
