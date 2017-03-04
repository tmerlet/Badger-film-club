import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    console.log('i am in handleChange')
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('A film was submitted: ' + this.state.value);
    event.preventDefault();
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

export default Form;
