import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Card, Image, Grid } from 'semantic-ui-react';
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
      <Grid className="users-grid">
        {users.map(user => (
          <Grid.Column computer={4} mobile={16}>
            <Link
              to={`/users/${user.username}`}
              key={user.username}
              // className="user-card"
            >
              <Card>
                <Image
                  src={`https://api.adorable.io/avatars/${Math.round(
                    Math.random() * 1000
                  )}`}
                />
                <Card.Content>
                  <Card.Header>{user.username}</Card.Header>
                  <Card.Meta>{user.name}</Card.Meta>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}

export default Users;
