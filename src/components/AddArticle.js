import React, { Component } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';

class AddArticle extends Component {
  state = {
    title: '',
    body: ''
  };

  handleOnChange = (e, { name, value }) => {
    e.preventDefault();

    //[name] to evaluate the and not give a key
    this.setState({ [name]: value });
  };

  handleOnSubmit = () => {
    const { title, body } = this.state;
    const { slug, user, postedArticle } = this.props;
    postedArticle(title, body, slug, user);
    this.setState({ title: '', body: '' });
  };

  render() {
    const { title, body } = this.state;

    return (
      <div className="create-article">
        <Form onSubmit={this.handleOnSubmit}>
          <h3>Create article</h3>
          {/* <Form.Group> */}
          <Form.Input
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleOnChange}
          />
          <Form.Input
            placeholder="Title"
            name="body"
            value={body}
            onChange={this.handleOnChange}
            control={TextArea}
          />
          <Button primary type="Submit" onClick={this.handleSubmit}>
            Submit
          </Button>
          {/* </Form.Group> */}
        </Form>
      </div>
    );
    // )
  }
}

export default AddArticle;
