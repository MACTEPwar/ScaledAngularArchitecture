import { Observable } from 'rxjs';

export interface IAuthenticationService {
    currentUser;
    login(username, password): Observable<any>;
    logout(): void;
    getAccessToken(): void;
}
