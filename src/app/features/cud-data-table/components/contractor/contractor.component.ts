import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import { ContractorService } from '../../services/concrete/contractor.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [ContractorService]
})
export class ContractorComponent extends TableDirective {

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected service: ContractorService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService, service, componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Контрагенты';
    this.url = '/contractor';
  }

}
