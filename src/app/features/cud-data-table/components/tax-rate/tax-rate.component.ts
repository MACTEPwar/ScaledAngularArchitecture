import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/concrete/authentication.service';
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
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected taxRateService: TaxRateService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService, taxRateService, componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Налоговые ставки';
    this.url = '/catalogs/taxrate';
  }
}
