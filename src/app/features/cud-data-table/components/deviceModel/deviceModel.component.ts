import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import { DeviceModelService } from '../../services/concrete/deviceModel.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [DeviceModelService]
})
export class DeviceModelComponent extends TableDirective {

  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected deviceModelService: DeviceModelService,
    componentFactoryResolver: ComponentFactoryResolver,
  ) {
    super(authenticationService, tabService, deviceModelService,  componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Модели устройств';
    this.url = '/catalogs/devicemodel';
  }
}
