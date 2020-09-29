import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { CashboxPermitService } from '../../services/concrete/cashboxPermit.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../../base-classes/table/table.component.html',
  styleUrls: ['../../base-classes/table/table.component.scss'],
  providers: [CashboxPermitService],
})
export class CashboxPermitComponent extends TableDirective {
  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected service: CashboxPermitService,
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
    this.title = 'Группа разрешений кассы';
    this.url = '/catalogs/cashboxpermit';
  }
}
