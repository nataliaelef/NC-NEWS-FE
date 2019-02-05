import React, { Component } from 'react';
import * as api from '../utils/api';

class Articles extends Component {
  state = {
    articles: []
  };

  componentDidMount = async () => {
    const articles = await api.getArticles();
    this.setState({ articles });
  };

  render() {
    const { articles } = this.state;

    return (
      <div className="articles">
        <ol>
          {articles.map(article => (
            <li className="articleList" key={article.article_id}>
              <div>author: {article.author}</div>
              <div>title: {article.title}</div>
              <div>created at: {article.created_at}</div>
              <div>topic: {article.topic}</div>
              <div>votes: {article.votes}</div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Articles;
