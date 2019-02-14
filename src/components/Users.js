import React, { Component } from 'react';
import { Card, Image, Grid, Dimmer, Loader } from 'semantic-ui-react';
import * as api from '../utils/api';

class Users extends Component {
  state = {
    users: [],
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const users = await api.getUsers();
    this.setState({ users, loading: false });
  };

  render() {
    const { users, loading } = this.state;

    return (
      <Grid className="users-grid">
        <Dimmer active={loading}>
          <Loader size="mini">Loading</Loader>
        </Dimmer>
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
