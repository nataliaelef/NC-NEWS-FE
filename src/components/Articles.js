import React, { Component } from 'react';
import { Link } from '@reach/router';
import {
  Card,
  Grid,
  Dropdown,
  Header,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { Redirect } from '@reach/router';
import * as api from '../utils/api';
import ArticleAdder from './ArticleAdder';

import Moment from 'react-moment';

class Articles extends Component {
  state = {
    articles: [],
    topics: '',
    redirect: null,
    loading: false,
    sortOption: null
  };

  renderArticles = () => {
    const { articles } = this.state;
    return articles.map(article => (
      <Card key={article.article_id} className="article-card">
        <Card.Content>
          <Link to={`/articles/${article.article_id}`}>
            <Card.Header>
              {article.title && article.title ? article.title : 'No Title'}
            </Card.Header>
          </Link>
          <Link to={`/topics/${article.topic}/articles`}>
            <Card.Meta>{article.topic}</Card.Meta>
          </Link>
          <Card.Meta>{article.author}</Card.Meta>
          <Card.Meta>
            <Moment format="YYYY/MM/DD">{article.created_at}</Moment>
          </Card.Meta>
          <Card.Meta>votes:{article.votes}</Card.Meta>
          <Card.Description>{article.body}</Card.Description>
        </Card.Content>
      </Card>
    ));
  };

  postedArticle = (title, body, slug, user) => {
    api.addArticleByTopic(title, body, slug, user).then(article => {
      this.setState({ redirect: `/articles/${article.article_id}` });
    });
  };

  onSortChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    this.selectSortOption(value).then();
  };

  selectSortOption = async selectedSortOption => {
    if (!selectedSortOption) return;
    const { topic } = this.props;

    const articles = await api.getArticlesByTopic(topic, selectedSortOption);
    this.setState({ articles });
  };

  sortOptions = [
    { text: 'Date created', value: 'created_at' },
    { text: 'Votes', value: 'votes' },
    { text: 'Comments', value: 'total_count' }
  ];

  updateArticles = async () => {
    let articles = [];
    this.setState({ loading: true });
    const { topic } = this.props;
    if (topic) {
      articles = await api.getArticlesByTopic(topic);
    } else {
      articles = await api.getArticles();
    }
    this.setState({ articles, loading: false });
  };

  componentDidMount = async () => {
    await this.updateArticles();
  };

  componentDidUpdate = async prevProps => {
    const { path } = this.props;
    if (prevProps.path !== path) {
      await this.updateArticles();
    }
  };

  render() {
    const { redirect, articles, loading } = this.state;
    const { topic, user } = this.props;
    const articlesColumnWidth = topic ? 12 : 16;

    return !redirect ? (
      <Grid reversed="mobile vertically">
        <Dimmer active={loading}>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
        <Grid.Column computer={articlesColumnWidth} mobile={16}>
          {topic && topic ? (
            <Grid.Row>
              <Grid.Row>
                <Grid.Column computer={16} mobile={16} className="topic-title">
                  <Header>{topic.toUpperCase()}</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                {articles.length ? (
                  <Dropdown
                    placeholder="Sort by"
                    name="sortOption"
                    selection
                    options={this.sortOptions}
                    onChange={this.onSortChange}
                    className="sortBy-dropdown"
                  />
                ) : (
                  ''
                )}
              </Grid.Row>
            </Grid.Row>
          ) : (
            ''
          )}
          <Grid.Row>
            <Grid className="articles" padded>
              {articles.length ? (
                this.renderArticles()
              ) : (
                <Header as="h1">
                  There are no articles for this topic yet
                </Header>
              )}
            </Grid>
          </Grid.Row>
        </Grid.Column>
        {topic && topic ? (
          <Grid.Column computer={4} mobile={16}>
            <ArticleAdder
              slug={topic}
              user={user}
              postedArticle={this.postedArticle}
            />
          </Grid.Column>
        ) : (
          ''
        )}
      </Grid>
    ) : (
      <Redirect noThrow to={redirect} />
    );
  }
}

export default Articles;
