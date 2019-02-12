import React, { Component } from 'react';
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
          <Grid.Column computer={4} mobile={16} key={user.username}>
            <Card>
              <Image src={user.avatar_url} />
              <Card.Content>
                <Card.Header>{user.username}</Card.Header>
                <Card.Meta>{user.name}</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}

export default Users;
