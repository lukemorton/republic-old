import routes from './routes';
import createStore from '../core/store';
import { match } from 'react-router';
import { renderToStaticMarkup } from 'react-dom-stream/server';
import ServerContainer from './container';

export default function router({ config, dependencies, logger }) {
  return function (request, response) {
    const { appTree } = dependencies;
    const store = createStore();

    match({ routes: routes({ appTree, store }), location: request.url }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        logger.info('Redirect location:', redirectLocation);
        response.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        logger.error('Routing error:', error);
        response.status(500).send(error.message);
      } else if (!renderProps) {
        response.status(404).send('Not found');
      } else {
        response.write('<!DOCTYPE html>');
        renderToStaticMarkup(ServerContainer({ appTree, config, store, renderProps })).pipe(response);
      }
    });
  };
}
