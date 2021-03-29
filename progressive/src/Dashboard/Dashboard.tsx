import React from 'react';
import axios from 'axios'
import './Dashboard.css';

export class Dashboard extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props)
    this.state = {
    };
  }

    render() {
      return (
      <div className="content">
      </div>
      );
    }

    public componentDidMount() {
    }
    
    private async getPosts() {
      let token = this.getCookie('accessToken');
      let response = await axios.get(
        'http://localhost:5000/posts',
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
