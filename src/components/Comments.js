import React, { Component } from 'react';
import { Comment, Header } from 'semantic-ui-react';
import * as api from '../utils/api';
import CommentItem from './CommenItem';

class Comments extends Component {
  state = {
    comments: []
  };

  componentDidMount = async () => {
    const { articleId } = this.props;
    const comments = await api.getCommentsByArticleId(articleId);
    this.setState({ comments });
  };

  renderComments = () => {
    return this.state.comments.map(comment => (
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
