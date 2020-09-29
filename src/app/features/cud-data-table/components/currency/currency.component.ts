import {Component, ComponentFactoryResolver} from '@angular/core';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import {CurrencyService} from '../../services/concrete/currency.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [CurrencyService]
})
export class CurrencyComponent extends TableDirective {

  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected service: CurrencyService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService, service, componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Валюты';
    this.url = '/currency';
    this.image = 'fas charging-station';
  }

}
