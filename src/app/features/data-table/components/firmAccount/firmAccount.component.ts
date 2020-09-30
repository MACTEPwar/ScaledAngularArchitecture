import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { FirmAccountService } from '../../services/concrete/firmAccount.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../../base-classes/table/table.component.html',
  styleUrls: ['../../base-classes/table/table.component.scss'],
  providers: [FirmAccountService]
})
export class FirmAccauntComponent extends TableDirective {

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected firmAccountService: FirmAccountService,
    cudService: CUDService,
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService
  ) {
    super(authenticationService, tabService, firmAccountService, cudService, componentFactoryResolver, translateService);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Аккаунт фирмы';
    this.url = '/catalogs/firmaccount';
  }
}
