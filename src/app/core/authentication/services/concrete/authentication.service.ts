import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../../shared/types/interfaces/i-user';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { IAuthenticationService } from '../interfaces/i-authentication.service';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
    // tslint:disable-next-line:variable-name
    private _currentUser: BehaviorSubject<IUser>;

    get currentUser(): IUser {
        return this._currentUser.value;
    }

    set currentUser(value: IUser) {
        if (!this._currentUser) {
            this._currentUser = new BehaviorSubject<IUser>(value);
        }
        this._currentUser.next(value);
    }

    constructor(private http: HttpClient, private route: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    login(username, password): Observable<any> {
        const formData: any = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('grant_type', 'password');

        return this.http
            .post<IUser>(`${environment.apiUrl}/api/auth/token`, formData)
            .pipe(
                map((user) => {
                    console.log('after login user - > ', user);

                    // временно добавляем в localStorage
                    localStorage.setItem('currentUser', JSON.stringify(user));

                    return (this.currentUser = user);
                })
            );
    }

    logout(): void {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.route.navigate(['/login']);
    }

    getAccessToken(): void {
        if (this.currentUser == null) {
            return this.logout();
        }
        const formData: any = new FormData();
        formData.append('refresh_token', this.currentUser.refresh_token);
        formData.append('grant_type', 'refresh_token');

        // запрос на получение access токена при наличии refresh токена
        console.log('запрос на получение access токена......');
        this.http
            .post<IUser>(`${environment.apiUrl}/api/auth/refresh`, formData).pipe(tap((user) => {
                console.log('USER TAP: ', user);
                // временно добавляем в localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                return (this.currentUser = user);
            },
                (errorRefresh) => {
                    console.log('REFRESH_TOKEN устарел =( ');
                    if (errorRefresh) {
                        return this.logout();
                    }
                }))
            .subscribe((resp) => {
                console.log('RESP SUBSCRIBER: ', resp);
            }, error => console.log('ERROR SUBSCRIBER: ', error));
    }
}


