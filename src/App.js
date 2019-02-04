import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Home from './components/Home';
import Users from './components/Users';
import Topics from './components/Topics';
import Articles from './components/Articles';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Router className="main-content">
          <Home path="/" />
          <Users path="/users" />
          <Topics path="/topics" />
          <Articles path="/articles" />
        </Router>
      </div>
    );
  }
}

export default App;
