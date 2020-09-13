import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ScaledAngularArchitecture';

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.translate.use(environment.defaultLocale);
  }
}
