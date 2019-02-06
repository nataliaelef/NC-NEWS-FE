import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Home from './components/Home';
import Users from './components/Users';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Article from './components/Article';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Router className="main-content">
          <Home path="/" />
          <Users path="/users" />
          <Users path="/users/:username" />
          <Topics path="/topics" />
          <Articles path="/articles" />
          {/* <Articles path="/articles/:topic" /> */}
          <Article path="/articles/:id" />
        </Router>
      </div>
    );
  }
}

export default App;
