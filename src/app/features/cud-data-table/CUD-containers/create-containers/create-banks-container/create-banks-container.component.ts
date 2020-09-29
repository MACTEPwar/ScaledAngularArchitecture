import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArrayName, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';

@Component({
  selector: 'al-create-banks-container',
  templateUrl: './create-banks-container.component.html'
})
export class CreateBanksContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    CodeM: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    CodeE: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),

      Name: new FormArray([
        new FormGroup({name: new FormControl('', Validators.required), language: new FormControl('ru')}),
        new FormGroup({name: new FormControl('', Validators.required), language: new FormControl('uk')})
      ]),

    Address: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(200)]),
    DateRegistration: new FormControl('', Validators.required),
    DateLicense: new FormControl('', Validators.required),
    NumberLicense: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    IsUse: new FormControl(false)
  });

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    translate: TranslateService
  ) {
    super(componentFactoryResolver, translate);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    super.OnInitBase();
    this.thisYear =  new Date().getFullYear();
  }
}
