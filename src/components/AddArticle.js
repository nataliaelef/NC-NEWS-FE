import React, { Component } from 'react';
import * as api from '../utils/api';
import { Form, TextArea, Button } from 'semantic-ui-react';

class AddArticle extends Component {
  state = {
    title: '',
    body: ''
  };

  handleOnChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value });
  };

  handleOnSubmit = () => {
    const { title, body } = this.state;
    const { slug, user, postedArticle } = this.props;
    // console.log(slug);
    // console.log(user);
    this.setState({ title, body });
    postedArticle(title, body, slug, user);
    this.setState({ title: '', body: '' });
  };

  componentDidMount = async () => {
    api.addArticleByTopic();
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
