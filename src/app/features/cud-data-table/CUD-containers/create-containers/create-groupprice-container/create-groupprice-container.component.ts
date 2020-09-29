import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArrayName, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';

@Component({
  selector: 'al-create-groupprice-container',
  templateUrl: './create-groupprice-container.component.html'
})
export class CreateGrouppriceContainerComponent extends CudCreateBase implements OnInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    Code: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    Name: new FormArray([
      new FormGroup({name: new FormControl('', Validators.required), language: new FormControl('ru')}),
      new FormGroup({name: new FormControl('', Validators.required), language: new FormControl('uk')})
    ]),
    ValueMin: new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    ValueMax: new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    Info: new FormControl('', [Validators.minLength(0), Validators.maxLength(250)]),
  });

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService);
  }

  ngOnInit(): void {
    super.OnInitBase();
  }
}
