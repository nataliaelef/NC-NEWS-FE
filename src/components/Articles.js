import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import { Card, Form, Input, TextArea, Button } from 'semantic-ui-react';
import Article from '../components/Article';
import * as api from '../utils/api';

class Articles extends Component {
  state = {
    articles: [],
    topics: ''
  };

  onArticleClick = id => {};

  renderArticles = () => {
    const { articles } = this.state;
    return articles.map(article => (
      <Link to={`/articles/${article.article_id}`} key={article.article_id}>
        <Card
          link
          header={article.title}
          meta={article.author}
          description={article.body}
        />
      </Link>
    ));
  };

  renderForm = () => (
    <Form>
      <h3>Create article</h3>
      <Form.Group widths="equal">
        <Form.Field control={Input} label="Title" placeholder="Title" />
      </Form.Group>
      <Form.Field
        control={TextArea}
        label="Body"
        placeholder="Start writing your article"
      />
      <Button primary type="Submit">
        Submit
      </Button>
    </Form>
  );

  selectTopic = selectedTopic => {
    //TODO: sort articles by selected topic
  };

  componentDidMount = async () => {
    //if this props includes topic then get by topic instead

    const articles = await api.getArticles();
    // const topics = top.map(user => ())
    this.setState({ articles });
  };

  render() {
    return (
      <div className="article-main">
        <div className="articles">{this.renderArticles()}</div>
        <div className="divider" />
        <div className="create-article">{this.renderForm()}</div>
      </div>
    );
  }
}

export default Articles;
