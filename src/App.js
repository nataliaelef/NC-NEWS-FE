import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
      </div>
    );
  }
}

export default App;
