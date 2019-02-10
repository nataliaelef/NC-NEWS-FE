import React, { Component } from 'react';
import { Button, Image, Grid, Header } from 'semantic-ui-react';
import * as api from '../utils/api';
import Comments from './Comments';
import CommentAdder from './CommentAdder';
import { Router, Redirect, Link } from '@reach/router';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    votes: 0
  };

  handleDelete = articleId => {
    api.deleteArticle(articleId).then(() => {
      this.setState({ article: null });
    });
  };

  postedComment = (body, username, articleId) => {
    api.addCommentByArticleId(body, username, articleId).then(comment => {
      this.setState(prevState => ({
        comments: [comment, ...prevState.comments]
      }));
    });
  };

  handleVoteClick = addedVote => {
    api.voteOnArticle(addedVote, this.props.id).then(() => {
      this.setState({
        votes: this.state.votes + addedVote
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.props;
    const article = await api.getArticleById(id);
    const comments = await api.getCommentsByArticleId(id);
    this.setState({ article, comments });
  };

  render() {
    const { article, votes, comments } = this.state;
    const { id: articleId, user } = this.props;
    return article ? (
      <Grid className="ui container">
        <Grid.Row>
          <h1 className="ui header">{article.title}</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column floated="right" computer={2} mobile={8}>
            <Image
              floated="right"
              size="mini"
              src={`https://api.adorable.io/avatars/${Math.round(
                Math.random() * 1000
              )}`}
            />
            <Header as="h4">{article.author}</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <p className="body">{article.body}</p>
        </Grid.Row>
        <Grid.Row>
          <div className="votes">Votes: {article.votes + votes} </div>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={8}>
            <Grid.Row>
              <Button
                basic
                color="green"
                disabled={votes === 1}
                onClick={() => this.handleVoteClick(1)}
              >
                Upvote
              </Button>
              <Button
                basic
                color="red"
                disabled={votes === -1}
                onClick={() => this.handleVoteClick(-1)}
              >
                Downvote
              </Button>
            </Grid.Row>
          </Grid.Column>
          {user === article.author ? (
            <Grid.Column computer={8} mobile={8}>
              <Button
                // disabled={user !== article.username}
                primary
                floated="right"
                onClick={() => this.handleDelete(articleId)}
              >
                Delete Article
              </Button>
            </Grid.Column>
          ) : (
            ''
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <CommentAdder
              articleId={articleId}
              postedComment={this.postedComment}
              user={user}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Comments comments={comments} />
        </Grid.Row>
      </Grid>
    ) : (
      <Grid>
        <Header as="h2">
          Article had been deleted. Click <Link to="/articles">here</Link> to go
          to the articles page
        </Header>
      </Grid>
    );
  }
}

export default Article;
