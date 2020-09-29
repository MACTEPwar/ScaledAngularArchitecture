import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'al-update-substance-container',
  templateUrl: './update-substance-container.component.html'
})
export class UpdateSubstanceContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

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
      Recipe: result.recipe,
      Info: result.info
    });
  }
}
