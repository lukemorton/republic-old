import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import { render, shallow } from 'enzyme';
import request from 'supertest';

global.React = React;
global.expect = expect;
global.isElementOfType = ReactTestUtils.isElementOfType;
global.shallow = shallow;
global.render = render;
global.request = request;

global.appTree = function ({ actions = {}, routes, views }) {
  const config = { routes: { default: routes } };
  return { app: { actions, views }, config };
};

class Element extends React.Component {
  render() {
    return React.DOM.div();
  }
}

class ApplicationLayout extends React.Component {
  render() {
    return React.DOM.div({ className: 'layout' }, this.props.children);
  }
}

class ServerLayout extends React.Component {
  render() {
    return React.DOM.html({}, React.DOM.body({}, this.props.children));
  }
}

global.Element = Element;
global.ApplicationLayout = ApplicationLayout;
global.ServerLayout = ServerLayout;
