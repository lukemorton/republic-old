import winston from 'winston';

export default function logger({ config }) {
  const logger = winston.cli();
  logger.setLevels(winston.config.npm.levels);
  logger.level = config.logger.level || 'info';

  logger.stream = {
    write: function (message, encoding) {
      logger.info(`server[http]: ${message.trim()}`);
    }
  };

  return logger;
}
