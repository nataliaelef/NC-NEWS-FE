import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Dropdown } from './common/Dropdown';
import * as api from '../utils/api';

class Nav extends Component {
  state = {
    usernames: []
  };

  selectUser = selectedUser => {
    //TODO: Do something with this value
    console.log(selectedUser);
  };

  componentWillMount = async () => {
    const users = await api.getUsers();
    console.log(await api.getArticles());
    const usernames = users.map(user => ({
      label: user.username,
      value: user.username
    }));
    usernames.unshift({ label: 'Select user', value: '' });
    this.setState({ usernames });
  };

  render() {
    return (
      <nav className="nav-bar">
        <div className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/articles">
            Articles
          </Link>
          <Link className="nav-link" to="/users">
            Users
          </Link>
          <Link className="nav-link" to="/topics">
            Topics
          </Link>
        </div>
        <div className="logged-user">
          <Dropdown
            label="Username"
            options={this.state.usernames}
            onValueChange={this.selectUser}
          />
        </div>
      </nav>
    );
  }
}

export default Nav;
