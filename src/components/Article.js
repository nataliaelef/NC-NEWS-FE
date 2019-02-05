import React, { Component } from 'react';

class Article extends Component {
  state = {
    article: {}
  };

  render() {
    const { article } = this.state;

    return (
      <div className="article" key={article.article_id}>
        <div>Author: {article.author}</div>
        <div>Title: {article.title}</div>
        <div>Created at: {article.created_at}</div>
        <div>Topic: {article.topic}</div>
        <div>Votes: {article.votes}</div>
      </div>
    );
  }
}

export default Article;
