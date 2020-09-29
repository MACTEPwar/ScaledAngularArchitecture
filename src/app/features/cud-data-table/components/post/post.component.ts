import {Component, ComponentFactoryResolver} from '@angular/core';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../baseclasses/table.component';
import {PostService} from '../../services/concrete/post.service';

@Component({
  templateUrl: '../../baseclasses/table.component.html',
  styleUrls: ['../../baseclasses/table.component.scss'],
  providers: [PostService]
})
export class PostComponent extends TableDirective {
  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected service: PostService,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService, service, componentFactoryResolver);
    this.currentUser = this.authenticationService.currentUser;
    this.title = 'Профессии';
    this.url = '/posts';
  }

}
