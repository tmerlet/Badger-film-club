import React, { Component, PropTypes } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createFilm(this.state.value)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        Add a film to the database:
        </label>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit"/>
      </form>
    )
  }
};

Form.propTypes = {
  createFilm: PropTypes.func.isRequired,
};

export default Form;
