import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Card, Image } from 'semantic-ui-react';
import * as api from '../utils/api';
import faker from 'faker';

class Users extends Component {
  state = {
    users: []
  };

  renderUsers = () => {
    const { users } = this.state;
    return users.map(user => (
      <Link to={`/users/${user.username}`} key={user.username}>
        <Card>
          <Image
            src={`https://api.adorable.io/avatars/${Math.round(
              Math.random() * 1000
            )}`}
          />
          <Card.Content>
            <Card.Header>{user.username}</Card.Header>
            <Card.Meta>{user.name}</Card.Meta>
            {/* <Card.Description>{user.avatar_url}</Card.Description> */}
          </Card.Content>
        </Card>
      </Link>
    ));
  };

  componentDidMount = async () => {
    const users = await api.getUsers();
    this.setState({ users });
  };

  render() {
    return (
      <div className="users">
        <div className="users">{this.renderUsers()}</div>
      </div>
    );
  }
}

export default Users;
