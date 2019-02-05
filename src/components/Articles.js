import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import * as api from '../utils/api';
import ArticleById from '../components/Article';

class Articles extends Component {
  state = {
    articles: [],
    topics: ''
  };

  selectTopic = selectedTopic => {
    //TODO: sort articles by selected topic
  };

  componentDidMount = async () => {
    const articles = await api.getArticles();
    // const topics = top.map(user => ())
    this.setState({ articles });
  };

  render() {
    const { articles } = this.state;

    return (
      <div className="article-main">
        <div className="articles">
          {/* <ol>
            {articles.map(article => (
              <li className="articleList" key={article.article_id}>
                <div>Author: {article.author}</div>
                <div>Title: {article.title}</div>
                <div>Created at: {article.created_at}</div>
                <div>Topic: {article.topic}</div>
                <div>Votes: {article.votes}</div>
              </li>
            ))}
          </ol> */}
          <ul>
            {articles.map(article => (
              <li className="articleList" key={article.article_id}>
                <Link to={`${article.article_id}`}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Router>
          <ArticleById path="/:article_id" />
        </Router>
        <div className="article-to-post">
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

export default Articles;
