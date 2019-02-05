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
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
