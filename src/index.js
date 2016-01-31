import * as form from './actions/form';
import * as http from './actions/http';
import * as state from './actions/state';
import Form from './views/form';

const actions = { form, http, state };
const views = { Form };

export default { actions, views };
