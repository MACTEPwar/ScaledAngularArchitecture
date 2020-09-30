import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import { BankService } from '../../services/concrete/bank.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [BankService]
})
export class BanksComponent extends TableDirective {

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected bankService: BankService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService, bankService, componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Банки';
    this.url = '/banks';
  }
}
