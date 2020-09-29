import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import { CashboxPermitService } from '../../services/concrete/cashboxPermit.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  providers: [CashboxPermitService],
})
export class CashboxPermitComponent extends TableDirective {
  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected service: CashboxPermitService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(
      authenticationService,
      tabService,
      service,
      componentFactoryResolver
    );
    this.currentUser = this.authenticationService.currentUser;
    // TODO: дописать
    this.title = 'Группа разрешений кассы';
    this.url = '/catalogs/cashboxpermit';
  }
}
