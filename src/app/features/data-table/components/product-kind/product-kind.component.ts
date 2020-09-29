import { Component, ComponentFactoryResolver } from '@angular/core';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { ProductKindService } from '../../services/concrete/product-kind.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: '../../base-classes/table/table.component.html',
    styleUrls: ['../../base-classes/table/table.component.scss'],
    providers: [ProductKindService]
})
export class ProductKindComponent extends TableDirective {

    constructor(
        authenticationService: AuthenticationService,
        tabService: ITabService,
        protected productKindService: ProductKindService,
        cudService: CUDService,
        componentFactoryResolver: ComponentFactoryResolver,
        translateService: TranslateService
    ) {
        super(authenticationService, tabService, productKindService, cudService, componentFactoryResolver, translateService);
        this.currentUser = this.authenticationService.currentUser;
        this.title = '';
        this.url = '/catalogs/productkind';
    }
}
