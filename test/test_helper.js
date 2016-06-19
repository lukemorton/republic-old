// Load test support
//
import './support/components';
import './support/dependencies';

// Expose test helpers as globals
//
import { expect } from 'chai';
global.expect = expect;

import React from 'react';
global.React = React;

import ReactTestUtils from 'react-addons-test-utils';
global.isElementOfType = ReactTestUtils.isElementOfType;

import { render, shallow } from 'enzyme';
global.shallow = shallow;
global.render = render;

import request from 'supertest';
global.request = request;

import sinon from 'sinon';
global.sinon = sinon;
