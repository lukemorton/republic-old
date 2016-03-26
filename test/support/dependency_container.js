global.buildContainer = function ({ actions = {}, routes, views }) {
  const config = { routes: { default: routes } };
  return { appTree: { app: { actions, views }, config } };
};

const exampleContainerTree = { routes: [['/', { page: 'hello#world' }]],
                               views: { hello: { world: { default: Element } },
                                        layouts: { application: { default: ApplicationLayout },
                                                   server: { default: ServerLayout } } } };

global.exampleContainer = buildContainer(exampleContainerTree);
