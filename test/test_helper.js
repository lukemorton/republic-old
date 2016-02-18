import { expect } from 'chai';
import { isElementOfType } from 'react-addons-test-utils';

global.expect = expect;
global.isElementOfType = isElementOfType;
global.appTree = function ({ actions = {}, routes, views }) {
    const config = { routes: { default: routes } };
    return { app: { actions, views }, config };
}
