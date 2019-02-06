import React, { Component } from 'react';
import { Comment, Header } from 'semantic-ui-react';
import * as api from '../utils/api';

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
      <Comment key={comment.comment_id}>
        <Comment.Avatar src="/images/avatar/small/joe.jpg" />
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <div>{comment.created_at}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Upvote</Comment.Action>
            <Comment.Action>Downvote</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
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
