import { Directive, Inject, OnInit } from '@angular/core';
import { IAuthenticationService } from '../../../core/authentication/services/interfaces/i-authentication.service';
import { BaseAppDirective } from '../../base-app/base.directive';
import { Stirng2FaIcon } from '../../../shared/helpers/string-2-faicon';
import { ITabService } from '../service/intefaces/i-tab.service';

@Directive()
export abstract class TabPageDirective extends BaseAppDirective implements OnInit {
    fields = [];

    title = '';
    url = '';
    image = null;

    protected constructor(
        @Inject('IAuthenticationService') protected authenticationService: IAuthenticationService,
        @Inject('ITabService') protected tabService: ITabService,
    ) {
        super(authenticationService, tabService);
    }

    ngOnInit(): any {
        console.log('TEST -->', this.url);
        console.log('TEST -->', !this.tabService.findTab(this.url));
        if (!this.tabService.findTab(this.url)) {
            this.tabService.pushTab({
                name: this.title,
                image: Stirng2FaIcon(this.image),
                url: this.url,
                canClose: true,
                active: true
            });
        } else {
            this.tabService.activateTab(this.tabService.findTab(this.url));
        }
    }
}
