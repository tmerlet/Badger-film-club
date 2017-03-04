import React, { Component } from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';

import Form from './';

describe.only('Form', () => {
  const shallowRenderedComponent = (props) => shallow(<Form { ...props }/>);

  it('renders a Form tag', () => {
    const component = shallowRenderedComponent();
    expect(component.find('form').length).to.equal(1);
  });

  it('renders an input of type text', () => {
    const component = shallowRenderedComponent();
    expect(component.find('input[type="text"]').length).to.equal(1);
  });

  it('renders an input of type submit', () => {
    const component = shallowRenderedComponent();
    expect(component.find('input[type="submit"]').length).to.equal(1);
  });
});
