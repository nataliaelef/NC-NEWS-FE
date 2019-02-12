import React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import CommentItem from './CommentItem';

const Comments = props => {
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {props.comments.map(comment => (
        <CommentItem
          comment={comment}
          user={props.user}
          key={comment.comment_id}
        />
      ))}
    </Comment.Group>
  );
};

export default Comments;
