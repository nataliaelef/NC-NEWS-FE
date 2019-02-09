import React, { Component } from 'react';
import { Form, TextArea, Button, Header } from 'semantic-ui-react';

class CommentAdder extends Component {
  state = {
    body: ''
  };

  handleOnChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value });
  };

  handleOnSubmit = () => {
    const { body } = this.state;
    const { articleId, user, postedComment } = this.props;

    postedComment(body, user, articleId);
    this.setState({ body: '' });
  };

  render() {
    const { body } = this.state;

    return (
      <Form className="comment" onSubmit={this.handleOnSubmit}>
        <Header as="h3" dividing>
          Add comment
        </Header>
        <Form.Input
          width={3}
          placeholder="Comment"
          name="body"
          value={body}
          onChange={this.handleOnChange}
          control={TextArea}
        />
        <Button type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default CommentAdder;
