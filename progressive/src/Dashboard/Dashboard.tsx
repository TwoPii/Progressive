import React from 'react';
import axios from 'axios'
import './Dashboard.css';

export class Dashboard extends React.Component<{}, {info: any, created: boolean}> {

  constructor(props: any) {
    super(props)
    this.state = {
        info: [],
        created: false
    };
  }

    render() {
        if( this.state.created )return (
          <div className="hero">
            <div className="property">Name: {this.state.info.name}</div>
            <div className="property">Attack: {this.state.info.attack}</div>
            <div className="property">Defense: {this.state.info.defense}</div>
            <div className="property">HP: {this.state.info.hp}</div>
          </div>     
        );
        else return (
          <div>
            <input id="hero-name" type="text"></input>
            <div onClick={() => this.createHero()}>Create Hero</div>
          </div>
        )
    }

    public componentDidMount() {
      this.getHero();
    }

    private async createHero() {
      let token = this.getCookie('accessToken');
      let response = await axios.post(
        'http://localhost:5000/create',
        {
          name: (document.getElementById('hero-name') as HTMLInputElement).value
        },
        {
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
            'access-token': token
          } 
        }
      );
      if (response.status !== 200 || response.data.error) console.log("ERROR");
      else {
        this.setState({created: true});
        this.getHero();
      }
    }

    private async getHero() {
      let token = this.getCookie('accessToken');
      let response = await axios.get(
        'http://localhost:5000/info',
        {
          headers: {
              'Access-Control-Allow-Origin' : '*',
              'Content-Type': 'application/json',
              'access-token': token
          }
        }
      );
      if (response.status !== 200 || response.data.error) console.log("ERROR");
      else {
        let info = response.data;
        let created = info !== "";
        this.setState({info, created})
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

}
