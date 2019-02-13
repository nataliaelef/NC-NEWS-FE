import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Redirect } from '@reach/router';
import { Card, Grid, Button } from 'semantic-ui-react';
import * as api from '../utils/api';
import TopicAdder from './TopicAdder';

class Topics extends Component {
  state = {
    topics: [],
    redirect: null
  };

  handleDelete = slug => {
    api.deleteTopicBySlug(slug).then(async () => {
      await this.getTopics();
    });
  };

  postedTopic = (slug, description) => {
    api.addTopic(slug.toLowerCase(), description).then(topic => {
      this.setState(prevState => ({ topics: [...prevState.topics, topic] }));
    });
  };

  componentDidMount = async () => {
    await this.getTopics();
  };

  getTopics = async () => {
    const topics = await api.getTopics();
    this.setState({ topics });
  };

  render() {
    const { topics, redirect } = this.state;
    return !redirect ? (
      <Grid className="topics-grid" divided reversed="mobile vertically">
        <Grid.Column computer={12} mobile={16}>
          <Grid className="topics">
            {topics.map(topic => (
              <Grid.Column computer={4} mobile={16} key={topic.slug}>
                <Card>
                  <Card.Content className="topic-card">
                    <Link
                      to={`/topics/${topic.slug}/articles`}
                      key={topic.slug}
                    >
                      <Card.Header>{topic.slug}</Card.Header>
                    </Link>
                    <Card.Description>{topic.description}</Card.Description>
                    <Button
                      primary
                      floated="right"
                      onClick={() => this.handleDelete(topic.slug)}
                    >
                      Delete Topic
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid>
        </Grid.Column>
        <Grid.Column computer={4} mobile={16}>
          <TopicAdder postedTopic={this.postedTopic} user={this.props.user} />
        </Grid.Column>
      </Grid>
    ) : (
      <Redirect noThrow to={redirect} />
    );
  }
}

export default Topics;
