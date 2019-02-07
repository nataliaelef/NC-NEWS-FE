import React, { Component } from 'react';
import { Comment, Header } from 'semantic-ui-react';
import CommentItem from './CommentItem';

class Comments extends Component {
  renderComments = () => {
    return this.props.comments.map(comment => (
      <CommentItem comment={comment} key={comment.comment_id} />
    ));
  };

  render() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        {this.renderComments()}
      </Comment.Group>
    );
  }
}

export default Comments;
