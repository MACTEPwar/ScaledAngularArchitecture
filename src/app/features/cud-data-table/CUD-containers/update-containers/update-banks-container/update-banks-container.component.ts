import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';

@Component({
  selector: 'al-update-banks-container',
  templateUrl: './update-banks-container.component.html',
  styleUrls: ['./update-banks-container.component.scss']
})
export class UpdateBanksContainerComponent extends CudUpdateBase implements OnInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  profileForm = new FormGroup({
    CodeM: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    CodeE: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    Name: new FormArray([
      new FormGroup({ name: new FormControl('', Validators.required), language: new FormControl('ru') }),
      new FormGroup({ name: new FormControl('', Validators.required), language: new FormControl('uk') })
    ]),
    Address: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(200)]),
    DateRegistration: new FormControl('', Validators.required),
    DateLicense: new FormControl('', Validators.required),
    NumberLicense: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    IsUse: new FormControl(false)
  });

  thisYear: number;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService);
  }

  ngOnInit(): void {
    this.thisYear = new Date().getFullYear();
    super.OnInitBase();
  }

  result2Form = (result: any): void => {
    this.profileForm.setValue({
      CodeM: result.codeM,
      CodeE: result.codeE,
      Name: [
        { name: result.name[0].name, language: result.name[0].language },
        { name: result.name[1].name, language: result.name[1].language },
      ],
      Address: result.address,
      DateRegistration: new Date(result.dateRegistration),
      DateLicense: new Date(result.dateLicense),
      NumberLicense: result.numberLicense,
      IsUse: result.isUse,
    });
  }
}
