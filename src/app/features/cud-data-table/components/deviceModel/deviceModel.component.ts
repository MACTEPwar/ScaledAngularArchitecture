import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
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
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
    protected deviceModelService: DeviceModelService,
    componentFactoryResolver: ComponentFactoryResolver,
  ) {
    super(authenticationService, tabService, deviceModelService,  componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Модели устройств';
    this.url = '/catalogs/devicemodel';
  }
}
