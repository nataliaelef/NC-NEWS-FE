import React, { Component } from 'react';
import * as api from '../utils/api';

class Topics extends Component {
  state = {
    topics: [],
    slug: null,
    description: null
  };

  componentDidMount = async () => {
    const topics = await api.getTopics();
    this.setState({ topics });
  };

  // componentDidUpdate = async (prevProps, prevState) => {
  //   if (prevState.slug !== null && prevProps.description !== null) {
  //     const topic = await api.addTopic(this.state.slug, this.state.description);
  //     this.setState({ topic });
  //   }
  // };

  render() {
    const { topics } = this.state;
    return (
      <div className="topic-main">
        <div className="topics">
          <ol>
            {topics.map(topic => (
              <li className="topic-list" key={topic.slug}>
                <div>Slug: {topic.slug}</div>
                <div>Description: {topic.description}</div>
              </li>
            ))}
          </ol>
        </div>
        <div className="topic-to-post">
          <form>
            <div className="field">
              <label>Slug</label>
              <input type="text" name="slug" placeholder="add slug" />
            </div>
            <div className="field">
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="add description"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Topics;
