import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }
  render () {
    return (
      <form >
        <input type="text"/>
        <input type="submit"/>
      </form>
    )
  }
};

export default Form;
