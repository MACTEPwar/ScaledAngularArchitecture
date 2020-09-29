import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArrayName, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';

@Component({
  selector: 'al-create-devicemodel-container',
  templateUrl: './create-devicemodel-container.component.html'
})
export class CreateDevicemodelContainerComponent extends CudCreateBase implements OnInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    Model: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    Protocol: new FormControl('', [Validators.minLength(0), Validators.maxLength(50)]),
    Type: new FormControl('', Validators.required),
    Info: new FormControl('', [Validators.minLength(0), Validators.maxLength(250)]),
  });

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService, ['Type']);
  }

  ngOnInit(): void {
    super.OnInitBase();
  }
}

