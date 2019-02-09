import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const About = () => {
  return (
    <Segment>
      <Header as="h1">About</Header>
      <p>
        Northcoders news is a webpage where you can read articles regarding
        several topics. Using the login dropdown you can get access in more
        functionabilies, such as adding articles and comments, voting on
        articles and comments. See articles by topic and delete your own
        articles and comments.
      </p>
    </Segment>
  );
};
export default About;
