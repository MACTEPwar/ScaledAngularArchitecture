import { Component, ComponentFactoryResolver, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { ProductGroupService } from '../../services/concrete/product-group.service';
import { TreeTableDirective } from '../../base-classes/tree-table/tree-table.component';

@Component({
    templateUrl: '../../base-classes/tree-table/tree-table.component.html',
    styleUrls: ['../../base-classes/tree-table/tree-table.component.scss'],
    providers: [ProductGroupService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGroupComponent extends TreeTableDirective {

    constructor(
        authenticationService: AuthenticationService,
        tabService: ITabService,
        protected productGroupService: ProductGroupService,
        cudService: CUDService,
        cdr: ChangeDetectorRef,
        componentFactoryResolver: ComponentFactoryResolver,
        translateService: TranslateService
    ) {
        super(authenticationService, tabService, productGroupService, cudService, cdr, componentFactoryResolver, translateService);
        this.currentUser = this.authenticationService.currentUser;
        this.title = '';
        this.url = '/catalogs/productgroup';
        this.controller = 'ProductGroup';
        this.parentId = 'ParentId';
        this.searchField = 'Name';
    }
}
