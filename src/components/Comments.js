import React, { Component } from 'react';
import { Comment, Header, Button } from 'semantic-ui-react';
import * as api from '../utils/api';

class Comments extends Component {
  state = {
    comments: [],
    votes: 0
  };

  handleCommentVoteClick = addedVote => {
    api
      .voteOnComment(addedVote, this.props.id, this.props.comment_id)
      // console.log(comment)
      .then(comments => {
        this.setState({ votes: this.state.votes + addedVote });
      });
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
          <Comment.Text>{comment.votes}</Comment.Text>
          <Comment.Actions>
            <Button
              size="mini"
              icon="arrow up"
              onClick={() => this.handleCommentVoteClick(1)}
            />
            <Button
              size="mini"
              icon="arrow down"
              onClick={() => this.handleCommentVoteClick(-1)}
            />
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
