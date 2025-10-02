import { IUser } from '../models/User';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser & { _id: any; isAdmin?: boolean };
      token?: string;
    }
  }
}

export {};
