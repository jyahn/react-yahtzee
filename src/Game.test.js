import React from 'react';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Game from './Game'

it('should lock a die when clicked', () => {
  let wrapper = mount(<Game />);
  let die = wrapper.find('button').first();
  die.simulate('click');
  expect(wrapper.state().locked[0]).toEqual(true)
})