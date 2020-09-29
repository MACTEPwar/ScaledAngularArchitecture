import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import { EmployeeService } from '../../services/concrete/employee.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [EmployeeService]
})
export class EmployeeComponent extends TableDirective {

  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected service: EmployeeService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService, service, componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Физические лица';
    this.url = '/employee';
  }

}
