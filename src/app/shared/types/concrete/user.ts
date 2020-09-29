import { IUser } from '../interfaces/i-user';

export class User implements IUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    // tslint:disable-next-line:variable-name
    access_token: string;
    // tslint:disable-next-line:variable-name
    refresh_token: string;
}
