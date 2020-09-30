import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'al-update-cashbox-permit-container',
  templateUrl: './update-cashbox-permit-container.component.html',
  // styleUrls: ['./update-cashbox-permit-container.component.scss']
})
export class UpdateCashboxPermitContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  profileForm = new FormGroup({
    Code: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    Name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
    Info: new FormControl('',  [Validators.minLength(0), Validators.maxLength(250)]),
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
      Code: result.code,
      Name: result.name,
      Info: result.info
    });
  }
}
