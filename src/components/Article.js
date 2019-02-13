import React, { Component } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { Redirect } from '@reach/router';
import * as api from '../utils/api';
import Comments from './Comments';
import CommentAdder from './CommentAdder';
import PageNotFound from './PageNotFound';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    votes: 0,
    redirect: null,
    hasError: false
  };

  handleDelete = articleId => {
    api.deleteArticle(articleId).then(() => {
      this.setState({ redirect: '/articles' });
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

  componentDidMount = () => {
    const { id } = this.props;
    api
      .getArticleById(id)
      .then(async article => {
        const comments = await api.getCommentsByArticleId(id);
        this.setState({ article, comments });
      })
      .catch(err => {
        this.setState({ hasError: true });
      });
  };

  render() {
    const { article, votes, comments, redirect, hasError } = this.state;
    const { id: articleId, user } = this.props;
    if (hasError) {
      return <PageNotFound />;
    } else {
      return !redirect ? (
        <Grid className="ui container">
          <Grid.Row>
            <h1 className="ui header">{article.title}</h1>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated="right" computer={2} mobile={8}>
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
            {user ? (
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
            ) : (
              ''
            )}
            {user === article.author ? (
              <Grid.Column computer={8} mobile={8}>
                <Button
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
            <Comments comments={comments} user={user} />
          </Grid.Row>
        </Grid>
      ) : (
        <Redirect noThrow to={redirect} />
      );
    }
  }
}

export default Article;
