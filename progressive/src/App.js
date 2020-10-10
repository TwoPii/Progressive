import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login/Login'

function App() {
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
                    <Login />
                </div>
            </section>
          </div>
  );
}

export default App;
