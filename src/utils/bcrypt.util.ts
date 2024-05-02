import * as bcrypt from 'bcrypt';
import { configService } from 'src/configs';

const saltRound = configService.saltRound;

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, saltRound);
}

export const comparePassword = async (password: string, hashPassword: string) => {
  if (!password || !hashPassword) return false;
  return bcrypt.compare(password, hashPassword);
}