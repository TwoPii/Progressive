import React from 'react';
import {Redirect} from 'react-router-dom';

export class Logout extends React.Component<{response:any}, {redirect: boolean}> {

  constructor(props: any) {
    super(props)
    this.state = {
      redirect: false
    }
  }

    render() {
        if( this.state.redirect) return <Redirect push to="/"></Redirect>
        else return<div></div>;
    }


    public componentDidMount(){
        this.deleteAllCookies();
        this.props.response(true);
        this.setState({redirect: true});

    }


    private deleteAllCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}
