import React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import CommentItem from './CommentItem';

const Comments = props => {
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {renderComments(props.comments)}
    </Comment.Group>
  );
};

const renderComments = comments => {
  return comments.map(comment => (
    <CommentItem comment={comment} key={comment.comment_id} />
  ));
};

export default Comments;
