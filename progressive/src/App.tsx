import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import './App.css';
import { Content } from './Content/Content';

export default class App extends React.Component<{},{authenticated: boolean}> {

  constructor(props: any){
    super(props);
    this.state = {
      authenticated: this.checkCookie()
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="topheader">
            <header className="container">
                <nav className="navbar">
                    <div className="navbar-brand">
                        {this.state.authenticated && <span className="navbar-item"><NavLink to="/dashboard">Dashboard</NavLink></span>}
                        {this.state.authenticated && <span className="navbar-item"><NavLink to="/logout">Logout</NavLink></span>}
                        {!this.state.authenticated && <span className="navbar-item"><NavLink to="/">Home</NavLink></span>}
                        {!this.state.authenticated && <span className="navbar-item"><NavLink to="/register">Register</NavLink></span>}
                        {!this.state.authenticated && <span className="navbar-item"><NavLink to="/login">Login</NavLink></span>}
                    </div>
                </nav>
            </header>
            </div>
            <Content change={(verif: boolean) => this.loginChanged(verif)}></Content>
        </BrowserRouter>
    );
  }

  private loginChanged(verification: boolean) {
    if(verification){
      let authenticated = this.checkCookie();
      this.setState({authenticated})
    }
  }

  private getCookie(cname: string) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  private checkCookie() {
    var accessToken = this.getCookie("accessToken");
    if (accessToken !== "") {
     return true;
    } else {
     return false;
    }
  }
}
