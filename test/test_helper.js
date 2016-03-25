import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import { render, shallow } from 'enzyme';

global.React = React;
global.expect = expect;
global.isElementOfType = ReactTestUtils.isElementOfType;
global.shallow = shallow;
global.render = render;

global.appTree = function ({ actions = {}, routes, views }) {
  const config = { routes: { default: routes } };
  return { app: { actions, views }, config };
};
