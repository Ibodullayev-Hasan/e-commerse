import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
}));