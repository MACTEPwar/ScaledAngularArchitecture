import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'al-update-formfactory-container',
  templateUrl: './update-formfactory-container.component.html'
})
export class UpdateFormfactoryContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Group: new FormControl('', [Validators.required]),
    Info: new FormControl('', [Validators.minLength(0), Validators.maxLength(1024)])
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
      Name: result.name,
      Group: result.group,
      Info: result.info
    });
  }
}
