import React, { Component } from 'react';
import { Login } from '../Login/Login';

export class Content extends Component<any, { token: string, info: string}> {
    constructor (props: any) {
        super(props);
        this.state = {
            token : '',
            info: ''
        };
    }
    render() {
        return (
            <div>
            {this.state.token.length === 0 && <Login obtainToken={(token) => this.obtainToken(token)}/>}
            {this.state.token.length !== 0 && this.state.info}
            </div>
        );
    }

    obtainToken(token: any) {
        this.setState({token: token, info: 'Logged in!'});
    }
    
}
