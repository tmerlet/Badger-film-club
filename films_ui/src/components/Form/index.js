import React, { Component, PropTypes } from 'react';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.title != '') {
      this.props.createFilm(this.state.title);
      this.setState({ title: '' })
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newTitle">Add a film to the database:</label>
        <input
          id="newTitle"
          onChange={this.handleChange}
          type="text"
          value={this.state.title}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
};

Form.propTypes = {
  createFilm: PropTypes.func.isRequired,
};

export default Form;
