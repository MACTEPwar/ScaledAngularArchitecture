import { Component, Inject, OnInit } from '@angular/core';
import { TabPageDirective } from '@features/tab/cmponent/tab-page.directive';
import { IAuthenticationService } from '@core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';

@Component({
  selector: 'al-create-firm',
  templateUrl: './create-firm.component.html',
  styleUrls: ['./create-firm.component.scss']
})
export class CreateFirmComponent extends TabPageDirective implements OnInit {

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') tabService: ITabService,
  ) {
    super(authenticationService, tabService);
    this.url = '/catalogs/firm/create';
    this.title = 'Новый контрагент';
    this.image = '';
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
