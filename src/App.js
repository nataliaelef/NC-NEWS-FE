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
  state = {
    user: '',
    topic: ''
  };

  onSelectUser = selectedUser => {
    this.setState({ user: selectedUser });
    if (!selectedUser) {
    }
  };

  renderMenu = () => {
    if (this.state.user) {
      return (
        <Router className="main-content">
          <Home path="/" user={this.state.user} />
          <Users path="/users" user={this.state.user} />
          <Topics path="/topics" user={this.state.user} />
          <Articles
            path="/articles"
            user={this.state.user}
            topic={this.state.topic}
          />
          <Article path="/articles/:id" user={this.state.user} />
          <Articles path="/topics/:topic/articles" user={this.state.user} />
        </Router>
      );
    } else {
      return (
        <Router className="main-content">
          <Home path="/" user={this.state.user} />
        </Router>
      );
    }
  };

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <Nav selectUser={this.onSelectUser} user={this.state.user} />
        {this.renderMenu()}
      </div>
    );
  }
}

export default App;
