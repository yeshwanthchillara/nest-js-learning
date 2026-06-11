import { registerAs } from '@nestjs/config';

const authConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));

export default authConfig;
