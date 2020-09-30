import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { GroupFirmService } from '../../services/concrete/group-firm.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: '../../base-classes/table/table.component.html',
    styleUrls: ['../../base-classes/table/table.component.scss'],
    providers: [GroupFirmService]
})
export class GroupFirmComponent extends TableDirective {

    constructor(
        @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
        @Inject('ITabService') tabService: ITabService,
        protected groupFirmService: GroupFirmService,
        cudService: CUDService,
        componentFactoryResolver: ComponentFactoryResolver,
        translateService: TranslateService
    ) {
        super(authenticationService, tabService, groupFirmService, cudService, componentFactoryResolver, translateService);
        this.currentUser = this.authenticationService.currentUser;
        this.title = '';
        this.url = '/catalogs/groupfirm';
    }
}
