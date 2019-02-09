import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Card, Image, Grid, Dropdown } from 'semantic-ui-react';
import * as api from '../utils/api';
import ArticleAdder from './ArticleAdder';

import Moment from 'react-moment';

class Articles extends Component {
  state = {
    articles: [],
    topics: ''
  };

  renderArticles = () => {
    const { articles } = this.state;
    return articles.map(article => (
      <Card key={article.article_id} className="article-card">
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src={`https://api.adorable.io/avatars/${Math.round(
              Math.random() * 1000
            )}`}
          />
          <Link to={`/articles/${article.article_id}`}>
            <Card.Header>{article.title}</Card.Header>
          </Link>
          <Link to={`/topics/${article.topic}/articles`}>
            <Card.Meta>{article.topic}</Card.Meta>
          </Link>
          <Card.Meta>{article.author}</Card.Meta>
          <Card.Meta>
            <Moment format="YYYY/MM/DD">{article.created_at}</Moment>
          </Card.Meta>
          <Card.Description>{article.body}</Card.Description>
        </Card.Content>
      </Card>
    ));
  };

  postedArticle = (title, body, slug, user) => {
    api.addArticleByTopic(title, body, slug, user).then(article => {
      this.setState(prevState => ({
        articles: [
          ...prevState.articles,
          { author: article.username, ...article }
        ]
      }));
    });
  };

  selectSortOption = async selectedSortOption => {
    if (!selectedSortOption) return;
    const articles = await api.getArticles(selectedSortOption);
    this.setState(articles);
  };

  sortOptions = [
    { text: 'Date created', value: 'created_at' },
    { text: 'Votes', value: 'votes' }
  ];

  updateArticles = async () => {
    let articles = [];
    if (this.props.topic) {
      articles = await api.getArticlesByTopic(this.props.topic);
    } else {
      articles = await api.getArticles();
    }
    this.setState({ articles });
  };

  componentDidMount = async () => {
    await this.updateArticles();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.path !== this.props.path) {
      await this.updateArticles();
    }
  };

  render() {
    const articlesColumnWidth = this.props.topic ? 12 : 16;
    return (
      <Grid reversed="mobile vertically" divided>
        <Grid.Column computer={articlesColumnWidth} mobile={16}>
          {this.props.topic && this.props.topic ? (
            <Grid.Row>
              <Dropdown
                placeholder="Sort by"
                selection
                options={this.sortOptions}
                onChange={() => {}}
                className="sortBy-dropdown"
              />
            </Grid.Row>
          ) : (
            ''
          )}
          <Grid.Row>
            <Grid className="articles" padded>
              {this.renderArticles()}
            </Grid>
          </Grid.Row>
        </Grid.Column>
        {this.props.topic && this.props.topic ? (
          <Grid.Column computer={4} mobile={16}>
            <ArticleAdder
              slug={this.props.topic}
              user={this.props.user}
              postedArticle={this.postedArticle}
            />
          </Grid.Column>
        ) : (
          ''
        )}
      </Grid>
    );
  }
}

export default Articles;
