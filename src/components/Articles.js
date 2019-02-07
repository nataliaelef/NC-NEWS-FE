import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Card, Form, Input, TextArea, Button, Image } from 'semantic-ui-react';
// import Article from '../components/Article';
import * as api from '../utils/api';

class Articles extends Component {
  state = {
    articles: [],
    topics: ''
  };

  renderArticles = () => {
    const { articles } = this.state;
    return articles.map(article => (
      <Link to={`/articles/${article.article_id}`} key={article.article_id}>
        <Card>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src={`https://api.adorable.io/avatars/${Math.round(
                Math.random() * 1000
              )}`}
            />
            <Card.Header>{article.title}</Card.Header>
            <Card.Meta>{article.topic}</Card.Meta>
            <Card.Meta>{article.author}</Card.Meta>
            <Card.Description>{article.body}</Card.Description>
          </Card.Content>
        </Card>
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

  componentDidMount = async () => {
    await this.updateArticles();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.path !== this.props.path) {
      await this.updateArticles();
    }
  };

  updateArticles = async () => {
    let articles = [];
    if (this.props.topic) {
      articles = await api.getArticlesByTopic(this.props.topic);
    } else {
      articles = await api.getArticles();
    }
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
