import { Component, ComponentFactoryResolver, ChangeDetectorRef, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { ProductCategoryService } from '../../services/concrete/product-category.service';
import { TreeTableDirective } from '../../base-classes/tree-table/tree-table.component';

@Component({
    templateUrl: '../../base-classes/tree-table/tree-table.component.html',
    styleUrls: ['../../base-classes/tree-table/tree-table.component.scss'],
    providers: [ProductCategoryService]
})
export class ProductCategoryComponent extends TreeTableDirective {

    constructor(
        @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
        @Inject('ITabService') tabService: ITabService,
        protected productCategoryService: ProductCategoryService,
        cudService: CUDService,
        cdr: ChangeDetectorRef,
        componentFactoryResolver: ComponentFactoryResolver,
        translateService: TranslateService
    ) {
        super(authenticationService, tabService, productCategoryService, cudService, cdr, componentFactoryResolver, translateService);
        this.currentUser = this.authenticationService.currentUser;
        this.title = 'Банки';
        this.url = '/catalogs/productcategory';
        this.controller = 'ProductCategory';
        this.parentId = 'ParentId';
        this.searchField = 'Name';
    }
}
