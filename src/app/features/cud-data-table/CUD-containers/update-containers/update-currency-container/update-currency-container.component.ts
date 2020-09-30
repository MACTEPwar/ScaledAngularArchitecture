import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';

@Component({
  selector: 'al-update-currency-container',
  templateUrl: './update-currency-container.component.html',
  // styleUrls: ['./update-currency-container.component.scss']
})
export class UpdateCurrencyContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  profileForm = new FormGroup({
    CodeNum: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    CodeChar: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(3)]),
    Name: new FormControl('',  [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
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

  result2Form = (result: any): void => {
    this.profileForm.setValue({
      CodeNum: result.codeNum,
      CodeChar: result.codeChar,
      Name: result.name,
      IsUse: result.isUse,
    });
  }
}
