import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import { FirmService } from '../../services/concrete/firm.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [FirmService]
})
export class FirmComponent extends TableDirective {

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected service: FirmService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService, service, componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Фирмы';
    this.url = '/firm';
  }

}
