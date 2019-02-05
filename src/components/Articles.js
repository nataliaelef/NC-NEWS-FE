import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import { Card, Form, Input, TextArea, Button } from 'semantic-ui-react';
import * as api from '../utils/api';

class Articles extends Component {
  state = {
    articles: [],
    topics: ''
  };

  renderArticles = () => {
    const { articles } = this.state;
    return articles.map(article => (
      <Card
        link
        header={article.title}
        meta={article.author}
        description={article.body}
      />
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
