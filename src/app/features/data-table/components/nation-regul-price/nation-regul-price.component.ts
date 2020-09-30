import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { NationRegulPriceService } from '../../services/concrete/nation-regul-price.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../../base-classes/table/table.component.html',
  styleUrls: ['../../base-classes/table/table.component.scss'],
  providers: [NationRegulPriceService]
})
export class NationRegulPriceComponent extends TableDirective {

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected nationRegulPriceService: NationRegulPriceService,
    cudService: CUDService,
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService
  ) {
    super(authenticationService, tabService, nationRegulPriceService, cudService, componentFactoryResolver, translateService);
    this.currentUser = this.authenticationService.currentUser;
    this.title = '';
    this.url = '/catalogs/nationregulprice';
  }
}
