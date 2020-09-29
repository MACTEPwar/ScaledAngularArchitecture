import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'al-update-post-container',
  templateUrl: './update-post-container.component.html',
  styleUrls: ['./update-post-container.component.scss']
})
export class UpdatePostContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  thisYear: number;

  profileForm = new FormGroup({
    Code: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(25)]),
    Name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(250)]),
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
      Name: result.name
    });
  }
}
