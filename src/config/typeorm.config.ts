import 'dotenv/config';

import { DataSource } from 'typeorm';

import databaseConfig from './database.config';

const db = databaseConfig();

export default new DataSource({
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.name,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  ssl: {
    ca: db.ssl.ca,
  },
});
