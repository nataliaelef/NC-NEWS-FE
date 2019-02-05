import React, { Component } from 'react';
import * as api from '../utils/api';

class Topics extends Component {
  state = {
    topics: []
  };

  componentDidMount = async () => {
    const topics = await api.getTopics();
    this.setState({ topics });
  };

  render() {
    const { topics } = this.state;
    return (
      <div className="topics">
        <ol>
          {topics.map(topic => (
            <li className="topicList" key={topic.slug}>
              <div>slug: {topic.slug}</div>
              <div>description: {topic.description}</div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Topics;
