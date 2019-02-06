import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import * as api from '../utils/api';
import Comments from './Comments';

class Article extends Component {
  state = {
    article: {},
    votes: 0
  };

  handleVoteClick = addedVote => {
    api.voteOnArticle(addedVote, this.props.id).then(() => {
      // console.log(article);
      this.setState({
        votes: this.state.votes + addedVote
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.props;
    const article = await api.getArticleById(id);
    this.setState({ article });
  };

  render() {
    const { article, votes } = this.state;
    return (
      <div className="ui container">
        <div className="article ">
          <h1 className="ui header">{article.title}</h1>
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
        <Comments articleId={this.props.id} />
      </div>
    );
  }
}

export default Article;
