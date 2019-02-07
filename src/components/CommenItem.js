import React, { Component } from 'react';
import { Comment, Button } from 'semantic-ui-react';
import * as api from '../utils/api';

class CommentItem extends Component {
  state = {
    comment: {},
    votes: 0,
    imageNum: Math.round(Math.random() * 1000)
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
    const { comment } = this.props;
    const { votes } = this.state;
    return (
      <Comment key={comment.comment_id}>
        <Comment.Avatar
          src={`https://api.adorable.io/avatars/${this.state.imageNum}`}
        />
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <div>{comment.created_at}</div>
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
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

export default CommentItem;
