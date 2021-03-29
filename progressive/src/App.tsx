import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import './App.css';
import { Content } from './Content/Content';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

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
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <li className="nav-item">{this.state.authenticated && <NavLink className="navbar-brand" to="/dashboard">Progressive</NavLink>}</li>
                    <li className="nav-item">{this.state.authenticated && <NavLink className="nav-link" to="/logout">Logout</NavLink>}</li>
                    <li className="nav-item">{!this.state.authenticated && <NavLink className="navbar-brand" to="/">Home</NavLink>}</li>
                    <li className="nav-item">{!this.state.authenticated && <NavLink className="nav-link" to="/register">Register</NavLink>}</li>
                    <li className="nav-item">{!this.state.authenticated && <NavLink className="nav-link" to="/login">Login</NavLink>}</li>
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
