import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { FirmService } from '../../services/concrete/firm.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: '../../base-classes/table/table.component.html',
  styleUrls: ['../../base-classes/table/table.component.scss'],
  providers: [FirmService]
})
export class FirmComponent extends TableDirective {

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected service: FirmService,
    cudService: CUDService,
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService,
    router: Router
  ) {
    super(authenticationService, tabService, service, cudService, componentFactoryResolver, translateService, router);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Фирмы';
    this.url = '/catalogs/firm';
    this.createInNewTab = true;
  }

}
