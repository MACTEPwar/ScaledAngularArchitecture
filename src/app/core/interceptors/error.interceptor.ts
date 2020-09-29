import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAuthenticationService } from '../authentication/services/interfaces/i-authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        @Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            console.log('CATCH_ERROR: ', err);

            if (err.status === 401) {
                console.log('ERROR 401 >>> ', err);
                // отправляем запрос с рефреш токеном на получение access токена
                this.authenticationService.getAccessToken();
                // auto logout if 401 response returned from api
                // this.authenticationService.logout();
                // location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);

        }));
    }
}
