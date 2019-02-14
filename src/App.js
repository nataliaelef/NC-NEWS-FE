import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Nav from './components/Nav';
import Users from './components/Users';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Article from './components/Article';
import About from './components/About';
import { Container, Grid } from 'semantic-ui-react';
import PageNotFound from './components/PageNotFound';

class App extends Component {
  state = {
    user: localStorage.getItem('user'),
    topic: ''
  };

  onSelectUser = (e, { value }) => {
    localStorage.setItem('user', value);
    this.setState({ user: value });
  };

  onSelectTopic = selectedTopic => {
    this.setState({ topic: selectedTopic });
    if (!selectedTopic) {
    }
  };

  renderMenu = () => {
    const { user, topic } = this.state;
    if (user) {
      return (
        <Grid className="main-content">
          <Router>
            <PageNotFound default />
            <About path="/about" />
            <Users path="/users" user={user} />
            <Topics path="/topics" user={user} />
            <Articles path="/" user={user} />
            <Articles path="/articles" user={user} />
            <Article path="/articles/:id" user={user} />
            <Articles
              path="/topics/:topic/articles"
              topic={topic}
              user={user}
            />
          </Router>
        </Grid>
      );
    } else {
      return (
        <Grid className="main-content">
          <Router className="main-content">
            <PageNotFound default />
            <About path="/about" />
            <Articles path="/" />
            <Article path="/articles/:id" />
          </Router>
        </Grid>
      );
    }
  };

  render() {
    const { user } = this.state;
    return (
      <Container className="App" fluid>
        <Nav
          selectUser={this.onSelectUser}
          user={user}
          selectTopic={this.onSelectTopic}
        />
        {this.renderMenu()}
      </Container>
    );
  }
}

export default App;
