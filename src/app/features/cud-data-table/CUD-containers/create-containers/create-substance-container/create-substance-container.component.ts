import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArrayName, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';

@Component({
  selector: 'al-create-substance-container',
  templateUrl: './create-substance-container.component.html'
})
export class CreateSubstanceContainerComponent extends CudCreateBase implements OnInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Code: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(25)]),
    Recipe: new FormControl('', [Validators.minLength(0), Validators.maxLength(10)]),
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
