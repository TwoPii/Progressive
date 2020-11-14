import React from 'react';
import './Login.css'
import axios from 'axios'
import {Redirect} from 'react-router-dom';





export class Login extends React.Component<{response: any}, {redirect: boolean}> {

  constructor(props: any) {
    super(props)
    this.state = {
      redirect: false
    }
  }

    render() {
        if( this.state.redirect) return <Redirect push to="/dashboard"></Redirect>
        else return (
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
      if (response.status !== 200 || response.data.error) this.props.response(false);
      else {
        let token = response.data.token;
        this.setCookie(token, 10);
        this.props.response(true);
        this.setState({redirect: true});

      }
    }

    private setCookie(token: string, days: number) {
      var d = new Date();
      d.setTime(d.getTime() + (days*24*3600*1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = "accessToken=" + token + ";" + expires + "path=/";
    }
}
