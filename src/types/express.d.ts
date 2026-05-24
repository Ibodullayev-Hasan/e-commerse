import { IUser } from './../interfaces/users.interface';

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

export {};