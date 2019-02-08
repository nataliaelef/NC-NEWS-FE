import React, { Component } from 'react';
import { Button, Image } from 'semantic-ui-react';
import * as api from '../utils/api';
import Comments from './Comments';
import AddComment from './AddComment';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    votes: 0
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
    return (
      <div className="ui container">
        <div className="article ">
          <h1 className="ui header">{article.title}</h1>
          <Image
            floated="right"
            size="mini"
            src={`https://api.adorable.io/avatars/${Math.round(
              Math.random() * 1000
            )}`}
          />
          <h4 className="ui header">{article.author}</h4>

          <p className="body">{article.body}</p>
          <div className="votes">Votes: {article.votes + votes} </div>
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
        </div>
        <AddComment
          articleId={articleId}
          postedComment={this.postedComment}
          user={user}
        />
        <Comments comments={comments} />
      </div>
    );
  }
}

export default Article;
