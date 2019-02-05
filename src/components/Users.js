import React, { Component } from 'react';
import * as api from '../utils/api';

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount = async () => {
    const users = await api.getUsers();
    this.setState({ users });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="users">
        <ul>
          {users.map(user => (
            <li className="userList" key={user.name}>
              <div>name: {user.name}</div>
              <div>username: {user.username}</div>
              <div>avatar_url: {user.avatar_url}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
