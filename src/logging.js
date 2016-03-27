import morgan from 'morgan';
import winston from 'winston';

export function createServerLogger({ config }) {
  switch (config.env) {
    case 'development':
      return morgan('dev');
    case 'test':
      return morgan('dev', { skip: _ => true });
    default:
      return morgan('combined');
  }
}

export function createLogger({ config }) {
  const logger = winston.cli();
  logger.setLevels(winston.config.npm.levels);
  logger.level = config.logger.level || 'info';
  return logger;
}
