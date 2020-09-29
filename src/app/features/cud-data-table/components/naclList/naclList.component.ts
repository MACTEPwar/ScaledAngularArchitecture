import {Component, ComponentFactoryResolver} from '@angular/core';
import { TableDirective } from '../../baseclasses/table.component';
import {NaclListService} from '../../services/concrete/naclList.service';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [NaclListService]
})
export class NaclListComponent extends TableDirective {

  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected service: NaclListService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService, service, componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Накладные';
    this.url = '/nacl';
  }

}
