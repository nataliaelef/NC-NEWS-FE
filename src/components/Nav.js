import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Menu, Container, Header, Dropdown } from 'semantic-ui-react';
import * as api from '../utils/api';

class Nav extends Component {
  state = {
    usernames: []
  };

  componentDidMount = async () => {
    const users = await api.getUsers();
    const usernames = users.map(user => ({
      text: user.username,
      value: user.username,
      image: user.avatar_url
    }));
    usernames.unshift({ label: 'Select user', value: '' });
    this.setState({ usernames });
  };

  render() {
    const { user } = this.props;
    return (
      <Container fluid className="nav-bar">
        <Header textAlign="center" as="h1" inverted>
          NORTHCODERS NEWS
        </Header>
        <Menu>
          <Link className="nav-link" to="/">
            <Menu.Item name="home" />
          </Link>
          {user && user ? (
            <Link className="nav-link" to="/articles">
              <Menu.Item name="articles" />
            </Link>
          ) : (
            ''
          )}
          {user && user ? (
            <Link className="nav-link" to="/users">
              <Menu.Item name="users" />
            </Link>
          ) : (
            ''
          )}
          {user && user ? (
            <Link className="nav-link" to="/topics">
              <Menu.Item name="topics" />
            </Link>
          ) : (
            ''
          )}
          <Link className="nav-link" to="/about">
            <Menu.Item name="about" />
          </Link>
          <Menu.Menu position="right">
            <Menu.Item>
              <Dropdown
                placeholder="Select User"
                selection
                defaultValue={user}
                options={this.state.usernames}
                onChange={this.props.selectUser}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}

export default Nav;
