import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import * as api from '../utils/api';
import Comments from './Comments';

class Article extends Component {
  state = {
    article: {}
  };

  componentDidMount = async () => {
    const { id } = this.props;
    const article = await api.getArticleById(id);
    this.setState({ article });
  };

  render() {
    const { article } = this.state;
    return (
      <div className="ui container">
        <div className="article ">
          <h1 className="ui header">{article.title}</h1>
          <h4 className="ui header">{article.author}</h4>
          <p className="body">{article.body}</p>
        </div>
        <Comments articleId={this.props.id} />
      </div>
    );
  }
}

export default Article;
