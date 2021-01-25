import React from 'react';
import axios from 'axios'
import './Dashboard.css';
import { Cell } from '../Cell/Cell';

export class Dashboard extends React.Component<{}, {selected: boolean, selectedPosition: any, matrix: any}> {

  constructor(props: any) {
    super(props)
    this.state = {
        selected: false,
        matrix: [ ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p' , 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      selectedPosition: {
        i: 0,
        j: 0
      }
    };
  }

    render() {
      let cells = [];
      for(let i = 0; i < 8; i++) {
        for (let j = 0; j  < 8; j++) {
          if((i%2 == 0 && j%2 == 0) || (i%2 != 0 && j%2 != 0)) 
            cells.push(<Cell dark={false} piece={this.state.matrix[i][j]} select={() => this.select(i, j)}></Cell>)
          else {
            cells.push(<Cell dark={true} piece={this.state.matrix[i][j]} select={() => this.select(i, j)}></Cell>)
          }
        }
      }
      return (
      <div className="content">
        <div className='board'>
          {cells}
        </div>
      </div>
      );
    }

    public componentDidMount() {
    }
    
    private isWhite(i: number, j: number) {
      if(this.state.matrix[i][j] != ''){
        return this.state.matrix[i][j] == this.state.matrix[i][j].toUpperCase();
      }
      return false;
    }

    private isEmpty(i: number, j: number) {
      console.log(this.state.matrix[i][j] == '');
      return this.state.matrix[i][j] === '';
    }

    private pawnMove(i: number, j: number, currentI: number, currentJ: number, isWhite: boolean): boolean {
      if (isWhite) {
        if ((i == currentI  - 1 || (i == currentI - 2 && currentI == 6)) && currentJ == j && this.isEmpty(i,j)) /* Normal move && start */
            return true;
        if (i == currentI - 1 && (j == currentJ - 1 || j == currentJ + 1) && !this.isWhite(i,j) && !this.isEmpty(i,j)) /* Kill move */
            return true;
        return false;
      }
      else {
        if ((i == currentI + 1 || (i == currentI + 2 && currentI == 1)) && currentJ == j && this.isEmpty(i,j)) /* Normal move && start */
          return true;
        if (i == currentI + 1 && (j == currentJ -1 || j == currentJ + 1 ) && this.isWhite(i,j) && !this.isEmpty(i,j)) /* Kill move */
          return true;
        return false;
      }
      /*Missing passing kill */
    }

    private rookMove(i: number, j: number, currentI: number, currentJ: number, isWhite: boolean): boolean {
      if (isWhite) {
        if (i == currentI) {
          var dj = Math.abs(currentJ - j);
          var right = currentJ - j > 0;
          var lineempty = false;
          for(let x = 1; x  <= dj; x++) {
            if (right) {
              if (this.isEmpty(i, currentJ - x)) lineempty = true;
              else {
                lineempty = false;
                break;
              }
            }
            else {
              if (this.isEmpty(i, currentJ + x)) lineempty = true;
              else {
                lineempty = false;
                break;
              }
            }
          }
          /*Missing kill */
          if(lineempty && (this.isEmpty(i,j) || !this.isWhite(i,j))) return true;
          return false;
        } else if (j == currentJ) {
          var di = Math.abs(currentI - i);
          var up = currentI - i > 0;
          var lineempty = false;
          for(let x = 1; x  <= di; x++) {
            if (up) {
              if (this.isEmpty(currentI - x, j)) lineempty = true;
              else {
                lineempty = false;
                break;
              }
            }
            else {
              if (this.isEmpty(currentI + x, j)) lineempty = true;
              else {
                lineempty = false;
                break;
              }
            }
          }
          if(lineempty && (this.isEmpty(i,j) || !this.isWhite(i,j))) return true;
          return false;
        }
      }
      return false;
    }

    private select(i: number, j: number) {
      if(!this.state.selected) this.setState({selected: true, selectedPosition: {i:i,j:j}});
      else {
        const currentI = this.state.selectedPosition.i;
        const currentJ = this.state.selectedPosition.j;
        let matrix = this.state.matrix;
        let piece: string = matrix[currentI][currentJ];
        const isWhiteCurrent = this.isWhite(currentI, currentJ)

        let correct: boolean = false;
        switch (piece.toUpperCase()) {
          case 'P':
            correct = this.pawnMove(i,j, currentI, currentJ, isWhiteCurrent);
            break;
          case 'R':
            correct = this.rookMove(i,j, currentI, currentJ, isWhiteCurrent);
            break;
          case 'N': 
            break;
          case 'B':
            break;
          case 'Q':
            break;
          case 'K':
            break;
          default:
            break;
        }
        if (correct && !this.isEmpty(currentI, currentJ)){
          matrix[i][j] = matrix[currentI][currentJ];
          matrix[this.state.selectedPosition.i][this.state.selectedPosition.j] = '';
          this.setState({selected: false, matrix})
        }
        else {
          this.setState({selected: false})
        }
      }
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
