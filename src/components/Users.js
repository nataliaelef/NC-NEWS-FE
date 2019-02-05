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
        <ol>
          {users.map(user => (
            <li className="userList" key={user.name}>
              <div>Name: {user.name}</div>
              <div>Username: {user.username}</div>
              <div>Avatar_url: {user.avatar_url}</div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Users;
