import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';
import { Login } from '../Login/Login';
import { Logout } from '../Logout/Logout';
import { Register } from '../Register/Register';
import './Home.css';

export class Content extends Component<{change: any}, { logged: boolean}> {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login">
                        <Login response={(val: boolean) => this.authenticated(val)}></Login>
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard></Dashboard>
                    </Route>
                    <Route path="/logout">
                        <Logout response={(val: boolean) => this.authenticated(val)}></Logout>
                    </Route>
                    <Route path="/register">
                        <Register></Register>
                    </Route>
                    <Route path="/">
                        <div className="home">Welcome to Chess</div>
                    </Route>
                </Switch>
            </div>
        );
    }

    private authenticated(val: boolean) {
        if(val) this.props.change(true);
        else this.props.change(false);
    }
}
