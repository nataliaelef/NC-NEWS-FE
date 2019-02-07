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

  onSelectTopic = selectedTopic => {
    this.setState({ topic: selectedTopic });
    if (!selectedTopic) {
    }
  };

  renderMenu = () => {
    if (this.state.user) {
      return (
        <Router className="main-content">
          <Home path="/" user={this.state.user} />
          <Users path="/users" user={this.state.user} />
          <Topics
            path="/topics"
            user={this.state.user}
            topic={this.state.topic}
          />
          <Articles path="/articles" user={this.state.user} />
          <Article path="/articles/:id" user={this.state.user} />
          <Articles
            path="/topics/:topic/articles"
            topic={this.state.topic}
            user={this.state.user}
          />
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
        <Nav
          selectUser={this.onSelectUser}
          user={this.state.user}
          selectTopic={this.onSelectTopic}
        />
        {this.renderMenu()}
      </div>
    );
  }
}

export default App;
