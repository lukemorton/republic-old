import * as form from './core/actions/form';
import * as http from './core/actions/http';
import * as state from './core/actions/state';
import Form from './core/views/form';

const actions = { form, http, state };
const views = { Form };

export default { actions, views };
