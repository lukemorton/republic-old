import morgan from 'morgan';

export function loadLogger({ config }) {
  switch (config.env) {
    case 'development':
      return morgan('dev');
    case 'test':
      return morgan('dev', { skip: _ => true });
    default:
      return morgan('combined');
  }
}
