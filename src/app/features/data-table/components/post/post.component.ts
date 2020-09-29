import { Component, ComponentFactoryResolver } from '@angular/core';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { AuthenticationService } from '../../../../core/authentication/services/concrete/authentication.service';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { TableDirective } from '../../base-classes/table/table.component';
import { PostService } from '../../services/concrete/post.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../../base-classes/table/table.component.html',
  styleUrls: ['../../base-classes/table/table.component.scss'],
  providers: [PostService],
})
export class PostComponent extends TableDirective {
  constructor(
    authenticationService: AuthenticationService,
    tabService: ITabService,
    protected service: PostService,
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
    this.title = 'Должности';
    this.url = '/catalogs/posts';
  }
}
