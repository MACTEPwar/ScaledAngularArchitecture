import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';



@Component({
  selector: 'al-create-employee-container',
  templateUrl: './create-employee-container.component.html'
})
export class CreateEmployeeContainerComponent extends CudCreateBase implements OnInit, ICudCreate {

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
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService, ['Sex']);
  }

  ngOnInit(): void {
    super.OnInitBase();
    this.thisYear =  new Date().getFullYear();
  }
}
