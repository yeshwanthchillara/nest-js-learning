import { Request } from 'express';

export type JwtPayload = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
