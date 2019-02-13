import React, { Component } from 'react';
import { Comment, Button } from 'semantic-ui-react';
import { Redirect } from '@reach/router';
import * as api from '../utils/api';
import Moment from 'react-moment';

class CommentItem extends Component {
  state = {
    comment: {},
    votes: 0,
    redirect: null
  };

  handleDelete = (commentId, articleId) => {
    api.deleteCommentByCommentId(articleId, commentId).then(() => {
      this.setState({ redirect: `/articles/${articleId}` });
    });
  };

  handleCommentVoteClick = addedVote => {
    const { comment } = this.props;
    api
      .voteOnComment(addedVote, comment.article_id, comment.comment_id)
      .then(() => {
        this.setState({ votes: this.state.votes + addedVote });
      });
  };

  componentDidMount = () => {
    this.setState({ comment: this.props.comment });
  };

  render() {
    const { user } = this.props;
    const { votes, comment, redirect } = this.state;
    return !redirect ? (
      <Comment key={comment.comment_id}>
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>
            {' '}
            }<Moment format="YYYY/MM/DD">{comment.created_at}</Moment>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Comment.Text>Votes: {comment.votes + votes}</Comment.Text>
          <Comment.Actions>
            <Button
              size="mini"
              icon="arrow up"
              disabled={votes === 1}
              onClick={() => this.handleCommentVoteClick(1)}
            />
            <Button
              size="mini"
              icon="arrow down"
              disabled={votes === -1}
              onClick={() => this.handleCommentVoteClick(-1)}
            />
            {user === comment.author ? (
              <Button
                primary
                floated="right"
                onClick={() =>
                  this.handleDelete(comment.comment_id, comment.article_id)
                }
              >
                Delete Comment
              </Button>
            ) : (
              ''
            )}
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    ) : (
      <Redirect noThrow to={redirect} />
    );
  }
}

export default CommentItem;
