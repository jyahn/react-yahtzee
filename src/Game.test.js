import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Game from './Game'

it('should lock a die when clicked', () => {
  let wrapper = mount(<Game />);
  let die = wrapper.find('button').first();
  die.simulate('click');
  expect(wrapper.state().locked[0]).toEqual(true)
})
it('should not allow a die to be unlocked when there are 0 rerolls left', () => {
  let wrapper = mount(<Game />);
  wrapper.state().rollsLeft = 0;
  let die = wrapper.find('button').first();
  die.simulate('click');
  expect(wrapper.state().locked[0]).toEqual(false)
})

it('should not allow a scoring category to be recomputed', () => {
  let wrapper = mount(<Game />);
  wrapper.state().scores["ones"] = 2;
  wrapper.state().dice = [1, 1, 1, 1, 1];
  let onesScore = wrapper.find('tr').first();
  onesScore.simulate('click');
  expect(wrapper.state().scores["ones"]).toEqual(2)
})