import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { StructureService } from '../../services/concrete/structure.service';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../../base-classes/table/table.component.html',
  styleUrls: ['../../base-classes/table/table.component.scss'],
  providers: [StructureService],
})
export class StructureComponent extends TableDirective {
  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected service: StructureService,
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
    this.title = 'Подразделения фирмы';
    this.url = '/catalogs/structure';
  }
}
