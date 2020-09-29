import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAuthenticationService } from '../authentication/services/interfaces/i-authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        @Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = this.authenticationService.currentUser;

        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`,
                    'Accept-Language': environment.defaultLocale
                }
            });
            console.log('токен передан: ', currentUser.access_token);
        }
        return next.handle(request);
    }
}
