import React, { Component } from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';

class TopicAdder extends Component {
  state = {
    slug: '',
    description: ''
  };

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { slug, description } = this.state;
    const { postedTopic } = this.props;
    postedTopic(slug, description);
    this.setState({ slug: '', description: '' });
  };

  render() {
    const { slug, description } = this.state;

    return (
      <div className="create-topic">
        <Form onSubmit={this.handleSubmit}>
          <h3>Create topic</h3>
          <Form.Input
            name="slug"
            value={slug}
            placeholder="Topic"
            onChange={this.handleChange}
          />
          <Form.Input
            name="description"
            value={description}
            placeholder="description"
            onChange={this.handleChange}
            control={TextArea}
          />
          <Button primary type="Submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default TopicAdder;
