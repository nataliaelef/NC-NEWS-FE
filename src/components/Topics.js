import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Card, Grid } from 'semantic-ui-react';
import * as api from '../utils/api';
import TopicAdder from './TopicAdder';

class Topics extends Component {
  state = {
    topics: []
  };

  postedTopic = (slug, description) => {
    api.addTopic(slug, description).then(topic => {
      this.setState(prevState => ({
        topics: [...prevState.topics, topic]
      }));
    });
  };
  componentDidMount = async () => {
    const topics = await api.getTopics();
    this.setState({ topics });
  };

  render() {
    const { topics } = this.state;
    return (
      <Grid className="topics-grid" divided reversed="mobile vertically">
        <Grid.Column computer={12} mobile={4}>
          <Grid className="topics">
            {topics.map(topic => (
              <Grid.Column computer={4} mobile={16} key={topic.slug}>
                <Link to={`/topics/${topic.slug}/articles`} key={topic.slug}>
                  <Card
                    link
                    header={topic.slug}
                    description={topic.description}
                    className="topic-card"
                  />
                </Link>
              </Grid.Column>
            ))}
          </Grid>
        </Grid.Column>
        <Grid.Column computer={4} mobile={16}>
          <TopicAdder postedTopic={this.postedTopic} user={this.props.user} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Topics;
