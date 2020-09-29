import { Component, OnInit } from '@angular/core';
import { TopTabPageDirective } from '../../../top-tab/top-tab-page.component';
import { AuthenticationService } from '@core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';

@Component({
  selector: 'al-create-firm',
  templateUrl: './create-firm.component.html',
  styleUrls: ['./create-firm.component.scss']
})
export class CreateFirmComponent extends TopTabPageDirective implements OnInit {

  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
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
