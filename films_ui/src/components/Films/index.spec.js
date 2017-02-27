import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Films from './';

describe.only('Films', () => {

  it('renders loading message when loading is true', () => {
    const component = shallow(<Films loading />);
    expect(component.html()).to.contain('Loading!');
  });

  it('does not render loading message when loading is false', () => {
    const component = shallow(<Films loading={false} />);
    expect(component.html()).to.not.contain('Loading!');
  });


});
