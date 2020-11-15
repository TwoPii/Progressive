import React from 'react';
import axios from 'axios'
import {NavLink} from 'react-router-dom';
import './Register.css';

export class Register extends React.Component<{}, {message: any}> {

  constructor(props: any) {
    super(props)
    this.state  = {
        message: <div></div>
    }
  }

    render() {
        return (
            <div className="register-box">
                <input id="user-name" type="text" placeholder="Username"/>
                <input id="password" type="password" placeholder="Password"/>
                <input id="password-confirm" type="password" placeholder="Comfirm Password"/>
                <div id="button" className="register" onClick={() => this.submit()}>
                  Register
                </div>
                <div className="message">{this.state.message}</div>
            </div>
        );
    }

    private async submit() {
      let username = (document.getElementById('user-name') as HTMLInputElement).value;
      let password = (document.getElementById('password') as HTMLInputElement).value;
      let passwordConfirm = (document.getElementById('password-confirm') as HTMLInputElement).value;
      let body = {
        username: username,
        password: password,
        passwordConfirm: passwordConfirm
      };
      let response = await axios.post(
        'http://localhost:5000/register',
        body,
        {
          headers: {
              'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json'
          }
        }
      );
      let message;
      if (response.status !== 200 || response.data.error){
        message = <div>Could not register correcty.  Passwords do not match or user exists.</div>
        this.setState({message});   
      }
      else {
        let message = <div>Registered! You can now <NavLink to="/login">login</NavLink></div>;
        this.setState({message});

      }
    }

    private setCookie(token: string, days: number) {
      var d = new Date();
      d.setTime(d.getTime() + (days*24*3600*1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = "accessToken=" + token + ";" + expires + "path=/";
    }
}
