import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Nav from './components/Nav';
import Users from './components/Users';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Article from './components/Article';
import About from './components/About';
import { Container, Segment } from 'semantic-ui-react';

class App extends Component {
  state = {
    user: '',
    topic: ''
  };

  onSelectUser = (e, { value }) => {
    this.setState({ user: value });
  };

  onSelectTopic = selectedTopic => {
    this.setState({ topic: selectedTopic });
    if (!selectedTopic) {
    }
  };

  renderMenu = () => {
    if (this.state.user) {
      return (
        <Segment>
          <Router className="main-content">
            <About path="/about" />
            <Users path="/users" user={this.state.user} />
            <Topics path="/topics" user={this.state.user} />
            <Articles path="/" />
            <Articles path="/articles" user={this.state.user} />
            <Article path="/articles/:id" user={this.state.user} />
            <Articles
              path="/topics/:topic/articles"
              topic={this.state.topic}
              user={this.state.user}
            />
          </Router>
        </Segment>
      );
    } else {
      return (
        <Segment>
          <Router className="main-content">
            <About path="/about" />
            <Articles path="/" />
            <Article path="/articles/:id" />
          </Router>
        </Segment>
      );
    }
  };

  render() {
    return (
      <Container className="App" fluid>
        <Nav
          selectUser={this.onSelectUser}
          user={this.state.user}
          selectTopic={this.onSelectTopic}
        />
        {this.renderMenu()}
      </Container>
    );
  }
}

export default App;
