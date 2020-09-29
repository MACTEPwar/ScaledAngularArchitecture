import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';

@Component({
  selector: 'al-update-unit-container',
  templateUrl: './update-unit-container.component.html'
})
export class UpdateUnitContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  profileForm = new FormGroup({
    CodeNum: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    CodeChar: new FormControl('', [Validators.minLength(0), Validators.maxLength(5)]),
    ShortLoc: new FormControl('',  [Validators.minLength(0), Validators.maxLength(16)]),
    ShortIntl: new FormControl('',  [Validators.minLength(0), Validators.maxLength(16)]),
    Name: new FormControl('',  [Validators.minLength(0), Validators.maxLength(100)]),
    Info: new FormControl('',  [Validators.minLength(0), Validators.maxLength(150)]),
    IsUse: new FormControl(false),
  });

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService);
  }

  ngOnInit(): void {
    super.OnInitBase();
  }

  result2Form = (result: any): void => {
    this.profileForm.setValue({
      CodeNum: result.codeNum,
      CodeChar: result.codeChar,
      ShortLoc: result.shortLoc,
      ShortIntl: result.shortIntl,
      Name: result.name,
      Info: result.info,
      IsUse: result.isUse,
    });
  }
}
