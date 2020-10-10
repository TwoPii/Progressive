import React from 'react';
import './App.css';
import { Content } from './Content/Content';

export default class App extends React.Component {

  render() {
    return (
      <div className="">
        <div className="topheader">
            <header className="container">
                <nav className="navbar">
                    <div className="navbar-brand">
                        <span className="navbar-item">LogApp</span>
                    </div>
                </nav>
            </header>
              </div>
              <section className="results--section">
                  <div className="results--section__inner">
                      <Content />
                  </div>
              </section>
            </div>
    );
  }
}
