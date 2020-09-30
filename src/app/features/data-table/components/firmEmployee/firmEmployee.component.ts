import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { FirmEmployeeService } from '../../services/concrete/firmEmployee.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../../base-classes/table/table.component.html',
  styleUrls: ['../../base-classes/table/table.component.scss'],
  providers: [FirmEmployeeService]
})
export class FirmEmployeeComponent extends TableDirective {

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected firmEmployeeService: FirmEmployeeService,
    cudService: CUDService,
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService
  ) {
    super(authenticationService, tabService, firmEmployeeService, cudService, componentFactoryResolver, translateService);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Сотрудники фирмы';
    this.url = '/catalogs/firmemployee';
  }
}
