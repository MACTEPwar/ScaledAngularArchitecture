import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import { StructureService } from '../../services/concrete/structure.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [StructureService],
})
export class StructureComponent extends TableDirective {
  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected service: StructureService,
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
    this.title = 'Подразделения фирмы';
    this.url = '/structure';
  }
}
