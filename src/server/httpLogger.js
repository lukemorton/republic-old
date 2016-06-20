import morgan from 'morgan';

export default function httpLogger({ config, logger }) {
  const morganConfig = Object.assign({}, config.httpLogger, { stream: logger.stream });

  switch (config.env) {
    case 'development':
      return morgan('dev', morganConfig);
    case 'test':
      return morgan('dev', Object.assign(morganConfig, { skip() { return true; } }));
    default:
      return morgan('combined', morganConfig);
  }
}
