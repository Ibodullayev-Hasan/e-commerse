import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp, context }) => {
  return `[${timestamp}] ${level}${context ? ` [${context}]` : ''}: ${message}`;
});

export const winstonConfig = () => {
  const isDev = process.env.NODE_ENV === 'development';

  const devFormat = combine(
    colorize({
      colors: {
        info: 'blue',
        error: 'red',
        warn: 'yellow',
        debug: 'magenta',
        verbose: 'cyan',
        log: 'green',
      },
    }),
    timestamp({ format: 'HH:mm:ss' }),
    customFormat,
  );

  const prodFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat,
  );

  return WinstonModule.createLogger({
    level: isDev ? 'debug' : 'warn',
    format: isDev ? devFormat : prodFormat,

    transports: [
      // Faqat dev da console
      ...(isDev ? [new transports.Console()] : []),

      // Faqat production da fayllarga yozish
      ...(!isDev ? [
        new (transports as any).DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxFiles: '30d',
          zippedArchive: true,
          format: prodFormat,
        }),
        new (transports as any).DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
          zippedArchive: true,
          format: prodFormat,
        }),
      ] : []),
    ],
  });
};