import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Card, Form, Input, Button } from 'semantic-ui-react';
import * as api from '../utils/api';

class Topics extends Component {
  state = {
    topics: []
  };

  renderTopics = () => {
    const { topics } = this.state;
    return topics.map(topic => (
      <Link to={`/topics/${topic.slug}`} key={topic.slug}>
        <Card link header={topic.slug} description={topic.description} />
      </Link>
    ));
  };

  renderForm = () => (
    <Form>
      <h3>Create topic</h3>
      <Form.Group widths="equal">
        <Form.Field control={Input} label="Title" placeholder="Title" />
      </Form.Group>
      <Button primary type="Submit">
        Submit
      </Button>
    </Form>
  );

  componentDidMount = async () => {
    const topics = await api.getTopics();
    this.setState({ topics });
  };

  render() {
    return (
      <div className="topic-main">
        <div className="topics">{this.renderTopics()}</div>
        <div className="divider" />
        <div className="create-topic">{this.renderForm()}</div>
      </div>
    );
  }
}

export default Topics;
