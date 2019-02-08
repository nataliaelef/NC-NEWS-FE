import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Card, Image } from 'semantic-ui-react';
// import Article from '../components/Article';
import * as api from '../utils/api';
import AddArticle from '../components/AddArticle';
import { Dropdown } from '../components/common/Dropdown';
import Moment from 'react-moment';

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
            <Card.Meta>
              <Moment format="YYYY/MM/DD">{article.created_at}</Moment>
            </Card.Meta>
            <Card.Description>{article.body}</Card.Description>
          </Card.Content>
        </Card>
      </Link>
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
    { label: 'Please select', value: '' },
    { label: 'Date created', value: 'created_at' },
    { label: 'Votes', value: 'votes' }
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
    if (this.props.topic) {
      return (
        <div className="article-main">
          <Dropdown
            label="Sort by"
            options={this.sortOptions}
            onValueChange={this.selectSortOption}
          />
          <div className="articles">{this.renderArticles()}</div>
          <div className="divider" />
          <AddArticle
            slug={this.props.topic}
            user={this.props.user}
            postedArticle={this.postedArticle}
          />
        </div>
      );
    } else {
      return (
        <div className="article-main">
          <Dropdown
            label="Sort by"
            options={this.sortOptions}
            onValueChange={this.selectSortOption}
          />
          <div className="articles">{this.renderArticles()}</div>
        </div>
      );
    }
  }
}

export default Articles;
