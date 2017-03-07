import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Films from './';

describe('Films', () => {

  const actions = {};

  describe('loading message', () => {

    it('renders when loading is true', () => {
      const component = shallow(<Films actions={actions} loading />);
      expect(component.html()).to.contain('Loading!');
    });

    it('does not render when loading is false', () => {
      const component = shallow(
        <Films actions={actions} films={[]} loading={false} />
      );
      expect(component.html()).to.not.contain('Loading!');
    });

  });

  it('renders given film when loading is false', () => {
    const component = shallow(
      <Films
        actions={actions}
        films={[{ id: 0, title: 'chicken' }]}
        loading={false}
      />
    );

    expect(component.find('li').length).to.equal(1);
    expect(component.find('li').at(0).props().children).to.equal('chicken');
  });

  it('renders given films when loading is false', () => {
    const component = shallow(
      <Films
        actions={actions}
        films={[{ id: 0, title: 'chicken' }, { id: 1, title: 'shard' }]}
        loading={false}
      />
    );

    expect(component.find('li').length).to.equal(2);
    expect(component.find('li').at(0).props().children).to.equal('chicken');
    expect(component.find('li').at(1).props().children).to.equal('shard');
  });

  it('renders a no films message when loading is false and films is empty', () => {
    const component = shallow(
      <Films
        actions={actions}
        films={[]}
        loading={false}
      />
    );

    expect(component.find('li').length).to.equal(0);
    expect(component.html()).to.contain('No films!');
  });

});
