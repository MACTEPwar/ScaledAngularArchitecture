import { Component, ComponentFactoryResolver, ChangeDetectorRef, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { StoreFrameService } from '../../services/concrete/storeframe.service';
import { TreeTableDirective } from '../../base-classes/tree-table/tree-table.component';

@Component({
  templateUrl: '../../base-classes/tree-table/tree-table.component.html',
  styleUrls: ['../../base-classes/tree-table/tree-table.component.scss'],
  providers: [StoreFrameService],
})
export class StoreFrameComponent extends TreeTableDirective {
  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected service: StoreFrameService,
    cudService: CUDService,
    cdr: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService
  ) {
    super(
      authenticationService,
      tabService,
      service,
      cudService,
      cdr,
      componentFactoryResolver,
      translateService
    );
    this.currentUser = this.authenticationService.currentUser;
    // TODO: дописать
    this.title = 'Структура склада';
    this.url = '/catalogs/storeframe';
    this.controller = 'StoreFrame';
    this.parentId = 'ParentId';
    this.searchField = 'Name';
  }
}
