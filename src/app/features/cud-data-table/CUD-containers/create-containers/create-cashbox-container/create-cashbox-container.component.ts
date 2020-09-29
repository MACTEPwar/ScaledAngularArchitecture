import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FirmComponent } from '../../../components/firm/firm.component';
import { StructureComponent } from '../../../components/structure/structure.component';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';

@Component({
  selector: 'al-create-cashbox-container',
  templateUrl: './create-cashbox-container.component.html'
})
export class CreateCashboxContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  @ViewChildren('keyFirm', { read: ViewContainerRef })
  keyFirm: any;
  @ViewChildren('displayFirm', { read: ViewContainerRef })
  displayFirm: any;

  @ViewChildren('keyStructure', { read: ViewContainerRef })
  keyStructure: any;
  @ViewChildren('displayStructure', { read: ViewContainerRef })
  displayStructure: any;

  profileForm = new FormGroup({
    FirmCode: new FormControl('', Validators.required),
    StructureId: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required),
    Number: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    Name: new FormArray([
      // tslint:disable-next-line:max-line-length
      new FormGroup({name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]), language: new FormControl('ru')}),
      // tslint:disable-next-line:max-line-length
      new FormGroup({name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]), language: new FormControl('uk')})
    ]),
   // Name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
    CertificateNumber: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(25)]),
    CertificateExpired:  new FormControl('', [Validators.required]),
    Info: new FormControl('',  [Validators.minLength(0), Validators.maxLength(150)]),
    IsDeleted: new FormControl(false),
  });

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService, ['Type']);
  }

  ngAfterViewInit(): void {
    this.keyFirm.changes.subscribe(key => {
      this.displayFirm.changes.subscribe(display => {
        this.contRef.push({
          link: 'Firm',
          fieldId: 'FirmCode',
          type: FirmComponent,
          key: key.last,
          display: display.last
        });
      });
    });

    this.keyStructure.changes.subscribe(key => {
      this.displayStructure.changes.subscribe(display => {
        this.contRef.push({
          link: 'Structure',
          fieldId: 'StructureId',
          type: StructureComponent,
          key: key.last,
          display: display.last
        });
      });
    });
  }

  ngOnInit(): void {
    super.OnInitBase();
  }
}
