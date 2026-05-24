import { registerAs } from '@nestjs/config';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs('database', (): PostgresConnectionOptions => ({
  type: 'postgres',
  applicationName: 'e-commerse',
  url: process.env.DATABASE_URI as string,
  entities: [path.join(__dirname, '../../**/*.entity.{ts,js}')],
  logging: true,
  synchronize: true, 
}));