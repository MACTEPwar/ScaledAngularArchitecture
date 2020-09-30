import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'al-update-employee-container',
  templateUrl: './update-employee-container.component.html',
  // styleUrls: ['./update-employee-container.component.scss']
})
export class UpdateEmployeeContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    Code: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(25)]),
    Surname: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    Name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    Patronymic: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    Sex: new FormControl('', Validators.required),
    Birthday: new FormControl('', Validators.required),
    Phone: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    Email: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(150)]),
    LocationId: new FormControl('', Validators.required),
    LocationAddress: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(250)]),
  });

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService, ['Sex']);
  }

  ngOnInit(): void {
    super.OnInitBase();
    this.thisYear =  new Date().getFullYear();
  }

  result2Form = (result: any): void => {
    this.profileForm.setValue({
      Code: result.code,
      Surname: result.surname,
      Name: result.name,
      Patronymic: result.patronymic,
      Sex: result.sex,
      Birthday: new Date(result.birthday),
      Phone: result.phone,
      Email: result.email,
      LocationId: result.locationId,
      LocationAddress: result.locationAddress,
    });
  }
}
