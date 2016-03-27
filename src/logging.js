import morgan from 'morgan';
import winston from 'winston';

export function createServerLogger({ config, logger }) {
  switch (config.env) {
    case 'development':
      return morgan('dev', { stream: logger.stream });
    case 'test':
      return morgan('dev', { skip: _ => true, stream: logger.stream });
    default:
      return morgan('combined', { stream: logger.stream });
  }
}

export function createLogger({ config }) {
  const logger = winston.cli();
  logger.setLevels(winston.config.npm.levels);
  logger.level = config.logger.level || 'info';

  logger.stream = {
    write: function (message, encoding) {
      logger.info('server[http]: ' + message.trim());
    }
  };

  return logger;
}
