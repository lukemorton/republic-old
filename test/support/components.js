import React from 'react';

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
