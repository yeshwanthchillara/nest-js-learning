import { registerAs } from '@nestjs/config';
import * as fs from 'fs';

const dbConfig = registerAs('db', () => ({
  url: process.env.DB_URL,
  name: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '27833', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl_mode: process.env.SSL_MODE,
  connection_limit: parseInt(process.env.CONNECTION_LIMIT ?? '20', 10),
  ssl: {
    ca: fs.readFileSync(process.env.CA_CERT_PATH ?? 'ca.pem').toString(),
  },
}));

export default dbConfig;
