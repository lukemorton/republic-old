import form from './actions/form';
import http from './actions/http';
import state from './actions/state';
import Form from './views/form';

const actions = { form, http, state };
const views = { Form };

export { actions, views };
