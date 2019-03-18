import { Express } from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import dateFormat from 'date-fns/format';

const logFormat = winston.format.printf(
  info =>
    `${dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS')} ${info.level}: ${info.meta.res.statusCode} ${info.message}`,
);
const format = winston.format.combine(logFormat);

export function registLogger(app: Express, isDevelopment: boolean) {
  if (isDevelopment) {
    app.use(
      expressWinston.logger({
        format,
        transports: [new winston.transports.Console()],
      }),
    );
  } else {
    app.use(
      expressWinston.logger({
        format,
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: `logs/${process.env.ACCESS_LOG || 'access.log'}` }),
        ],
        level: 'info',
      }),
    );
    app.use(
      expressWinston.errorLogger({
        format,
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: `logs/${process.env.ERROR_LOG || 'error.log'}` }),
        ],
      }),
    );
  }
}
