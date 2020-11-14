import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';
import { Login } from '../Login/Login';
import { Logout } from '../Logout/Logout';

export class Content extends Component<{change: any}, { logged: boolean}> {
    constructor (props: any) {
        super(props);
    }
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
                    <Route path="/">
                        <div>Home</div>
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
