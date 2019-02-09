import React from 'react';
import { Header, Container, Grid } from 'semantic-ui-react';

const About = () => {
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Header as="h1">About</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16}>
            <p>
              Northcoders news is a webpage where you can read articles
              regarding several topics. Using the login dropdown you can get
              access in more functionabilies, such as adding articles and
              comments, voting on articles and comments. See articles by topic
              and delete your own articles and comments.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
export default About;
