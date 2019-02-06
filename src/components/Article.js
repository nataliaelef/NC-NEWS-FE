import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import * as api from '../utils/api';
import Comments from './Comments';

class Article extends Component {
  state = {
    article: {},
    voteChange: 0
  };

  handleVoteClick = voteChange => {
    api.voteOnArticle(voteChange, this.props.id).then(article => {
      console.log(article);
      this.setState({ voteChange });
    });
  };

  componentDidMount = async () => {
    const { id } = this.props;
    const article = await api.getArticleById(id);
    this.setState({ article });
  };

  render() {
    const { article, voteChange } = this.state;
    return (
      <div className="ui container">
        <div className="article ">
          <h1 className="ui header">{article.title}</h1>
          <h4 className="ui header">{article.author}</h4>
          <p className="body">{article.body}</p>
          <div className="votes">{article.votes + voteChange} </div>
          <Button
            basic
            color="green"
            disabled={this.state.voteChange === 1}
            onClick={() => this.handleVoteClick(1)}
          >
            Upvote
          </Button>
          <Button
            basic
            color="red"
            disabled={voteChange === -1}
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
