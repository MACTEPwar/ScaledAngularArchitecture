import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { CashboxPermitActionService } from '../../services/concrete/cashboxPermitAction.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../../base-classes/table/table.component.html',
  styleUrls: ['../../base-classes/table/table.component.scss'],
  providers: [CashboxPermitActionService],
})
export class CashboxPermitActionComponent extends TableDirective {
  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected service: CashboxPermitActionService,
    cudService: CUDService,
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService
  ) {
    super(
      authenticationService,
      tabService,
      service,
      cudService,
      componentFactoryResolver,
      translateService
    );
    this.currentUser = this.authenticationService.currentUser;
    // TODO: дописать
    this.title = 'Разрешения по операциям в группе';
    this.url = '/catalogs/cashboxpermitaction';
  }
}
