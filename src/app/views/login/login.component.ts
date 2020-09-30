import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { INotificationService } from '../../core/notification/i-notification.service';
import { IAuthenticationService } from '../../core/authentication/services/interfaces/i-authentication.service';
import { environment } from '../../../environments/environment';
import { faEye, faEyeSlash } from '@fortawesome/pro-light-svg-icons';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'login.component.html',
  selector: 'al-login',
  styleUrls: ['login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  imagePath = environment.imagePath;
  passType = 'password';
  eyePass = faEye;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
    @Inject('INotificationService') private notificationService: INotificationService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    // redirect to dashboard if already logged in
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    console.log('---=== LOGIN INIT ===---');

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    console.log(this.loginForm);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot?.queryParams?.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }

  passView($event): void {
    $event.preventDefault();
    if (this.passType === 'password') {
      this.passType = 'text';
      this.eyePass = faEyeSlash;
    } else {
      this.passType = 'password';
      this.eyePass = faEye;
    }
  }

  // log($event) {
  //   $event.target.labels[0].style.color = 'red';
  // }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.notificationService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.notificationService.error(error);
          this.loading = false;
          this.showWarn();
          console.log('Сервер недоступен');
        }
      );
  }


  showWarn(): void {
    this.translate.get(['LOGIN.TEXT1', 'LOGIN.TEXT2']).subscribe((translations) => {
      this.messageService.add({
        severity: 'error',
        summary: translations['LOGIN.TEXT1'],
        detail: translations['LOGIN.TEXT2'],
        life: 4000,
        closable: false,
      });
    });
  }
}
