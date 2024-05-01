import * as dotenv from 'dotenv';
dotenv.config();

export const configService = {
  port: parseInt(process.env.PORT),
  saltRound: parseInt(process.env.SALT_ROUND),
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  jwt: {
    global: true,
    secret: process.env.JWT_SECRET,
    signInOptions: {
      expiresIn: '1h',
    }
  },
  newsApiKey: process.env.NEWS_API_KEY,
}