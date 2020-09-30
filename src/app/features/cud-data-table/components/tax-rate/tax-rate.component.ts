import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '@core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import { TaxRateService } from '../../services/concrete/tax-rate.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [TaxRateService]
})
export class TaxRateComponent extends TableDirective {

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected taxRateService: TaxRateService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService, taxRateService, componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Налоговые ставки';
    this.url = '/catalogs/taxrate';
  }
}
