import { Component, ComponentFactoryResolver, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TreeTableDirective } from '../../base-classes/tree-table/tree-table.component';
import { LocationService } from '../../services/concrete/location.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../../base-classes/tree-table/tree-table.component.html',
  styleUrls: ['../../base-classes/tree-table/tree-table.component.scss'],
  providers: [LocationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent extends TreeTableDirective {
  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected service: LocationService,
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
    this.title = 'Адреса';
    this.url = '/catalogs/location';
    this.controller = 'Location';
    this.parentId = 'ParentId';
    this.searchField = 'Name';
  }
}
