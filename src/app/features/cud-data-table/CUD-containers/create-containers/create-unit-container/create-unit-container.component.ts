import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';



@Component({
  selector: 'al-create-unit-container',
  templateUrl: './create-unit-container.component.html'
})
export class CreateUnitContainerComponent extends CudCreateBase implements OnInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    CodeNum: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    CodeChar: new FormControl('', [Validators.minLength(0), Validators.maxLength(5)]),
    ShortLoc: new FormControl('',  [Validators.minLength(0), Validators.maxLength(16)]),
    ShortIntl: new FormControl('',  [Validators.minLength(0), Validators.maxLength(16)]),
    Name: new FormControl('',  [Validators.minLength(0), Validators.maxLength(100)]),
    Info: new FormControl('',  [Validators.minLength(0), Validators.maxLength(150)]),
    IsUse: new FormControl(false),
    IsDeleted: new FormControl(true),
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
