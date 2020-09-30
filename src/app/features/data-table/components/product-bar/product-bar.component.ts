import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { ProductBarService } from '../../services/concrete/product-bar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: '../../base-classes/table/table.component.html',
    styleUrls: ['../../base-classes/table/table.component.scss'],
    providers: [ProductBarService]
})
export class ProductBarComponent extends TableDirective {

    constructor(
        @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
        @Inject('ITabService') tabService: ITabService,
        protected productBarService: ProductBarService,
        cudService: CUDService,
        componentFactoryResolver: ComponentFactoryResolver,
        translateService: TranslateService
    ) {
        super(authenticationService, tabService, productBarService, cudService, componentFactoryResolver, translateService);
        this.currentUser = this.authenticationService.currentUser;
        this.title = 'Штрих коды';
        this.url = '/catalogs/productbar';
    }
}
