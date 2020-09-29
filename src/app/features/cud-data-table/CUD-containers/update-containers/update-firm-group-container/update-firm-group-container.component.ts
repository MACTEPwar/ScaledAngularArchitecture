import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';

@Component({
  selector: 'al-update-firm-group-container',
  templateUrl: './update-firm-group-container.component.html',
  styleUrls: ['./update-firm-group-container.component.scss']
})
export class UpdateFirmGroupContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  profileForm = new FormGroup({
    FirmCode: new FormControl('', [Validators.required]),
    GroupFirmName: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
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
      FirmCode: result.firmCode,
      GroupFirmName: result.groupFirmName
    });
  }
}
