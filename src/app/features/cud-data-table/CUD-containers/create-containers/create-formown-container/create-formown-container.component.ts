import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArrayName, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';

@Component({
  selector: 'al-create-formown-container',
  templateUrl: './create-formown-container.component.html'

})
export class CreateFormownContainerComponent extends CudCreateBase implements OnInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    CodeNum: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    CodeChar: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    Name: new FormArray([
      new FormGroup({name: new FormControl('', Validators.required), language: new FormControl('ru')}),
      new FormGroup({name: new FormControl('', Validators.required), language: new FormControl('uk')})
    ]),
    IsUse: new FormControl(false),
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
