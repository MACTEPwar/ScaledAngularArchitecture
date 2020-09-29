import { IUser } from '../../shared/types/interfaces/i-user';
import { ITabService } from '../tab/service/intefaces/i-tab.service';
import { Inject } from '@angular/core';
import { IAuthenticationService } from '../../core/authentication/services/interfaces/i-authentication.service';

export abstract class BaseAppDirective {
    currentUser: IUser;
    // loading = true;

    protected constructor(
        @Inject('IAuthenticationService') protected authenticationService: IAuthenticationService,
        @Inject('ITabService') protected tabService: ITabService,
    ) {
        this.currentUser = this.authenticationService.currentUser;
    }
}
