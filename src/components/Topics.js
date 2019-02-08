import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Card } from 'semantic-ui-react';
import * as api from '../utils/api';
import AddTopic from './AddTopic';

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

  renderTopics = () => {
    const { topics } = this.state;
    return topics.map(topic => (
      <Link to={`/topics/${topic.slug}/articles`} key={topic.slug}>
        <Card link header={topic.slug} description={topic.description} />
      </Link>
    ));
  };

  componentDidMount = async () => {
    const topics = await api.getTopics();
    this.setState({ topics });
  };

  render() {
    return (
      <div className="topic-main">
        <div className="topics">{this.renderTopics()}</div>
        <div className="divider" />
        <AddTopic postedTopic={this.postedTopic} user={this.props.user} />
      </div>
    );
  }
}

export default Topics;
