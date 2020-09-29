import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArrayName, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {CudUpdateBase} from '../../../baseclasses/cud-update-base';
import {ICudUpdate} from '../../../baseclasses/i-cud-update';

@Component({
  selector: 'al-update-devicemodel-container',
  templateUrl: './update-devicemodel-container.component.html'
})
export class UpdateDevicemodelContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

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
  result2Form = (result: any): void => {
    this.profileForm.setValue({
      Model: result.model,
      Protocol: result.protocol,
      Type: result.type,
      Info: result.info,
    });
  }
}
