import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArrayName, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';

@Component({
  selector: 'al-create-firm-container',
  templateUrl: './create-firm-container.component.html'
})
export class CreateFirmContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    Code: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(25)]),
    Section: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required),
    FormOwnCodeChar: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    NameShort: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(150)]),
    NameFull: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(250)]),
    Phone: new FormControl('', [Validators.minLength(0), Validators.maxLength(25)]),
    Fax: new FormControl('', [Validators.minLength(0), Validators.maxLength(25)]),
    Email: new FormControl('', [Validators.minLength(0), Validators.maxLength(100)]),
    LocationAddress: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(250)]),
    TaxIsPay: new FormControl(false),
    TaxNumber: new FormControl('', [Validators.minLength(0), Validators.maxLength(50)]),
    TaxCertNumber: new FormControl('', [Validators.minLength(0), Validators.maxLength(50)]),
    TaxCertDate: new FormControl('', Validators.required),
    Info: new FormControl('', [Validators.minLength(0), Validators.maxLength(250)]),
  });

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    translate: TranslateService
  ) {
    super(componentFactoryResolver, translate, ['Type', 'Section']);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    super.OnInitBase();
    this.thisYear =  new Date().getFullYear();
  }
}
