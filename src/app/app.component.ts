import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ScaledAngularArchitecture';

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.translate.use(environment.defaultLocale);
  }

  isLogin(): boolean {
    return this.router.url.endsWith('login');
  }
}
