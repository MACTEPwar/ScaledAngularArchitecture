import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ViewChildren, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FirmComponent } from '../../../components/firm/firm.component';
import { StructureComponent } from '../../../components/structure/structure.component';

@Component({
  selector: 'al-update-cashbox-container',
  templateUrl: './update-cashbox-container.component.html',
  styleUrls: ['./update-cashbox-container.component.scss']
})
export class UpdateCashboxContainerComponent extends CudUpdateBase implements OnInit, AfterViewInit, ICudUpdate {

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
    Id: new FormControl('', Validators.required),
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
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService, ['Type']);
  }

  ngOnInit(): void {
    super.OnInitBase();
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

  result2Form = (result: any): void => {
    this.profileForm.setValue({
      FirmCode: result.firmCode,
      StructureId: result.structureId,
      Type: result.type,
      Number: result.number,
      Name: [
        { name: result.name[0].name, language: result.name[0].language },
        { name: result.name[1].name, language: result.name[1].language },
      ],
      CertificateNumber: result.certificateNumber,
      CertificateExpired: new Date(result.certificateExpired),
      Info: result.info,
      IsDeleted: result.isDeleted,
      Id: result.id
    });

    this.displayFirm.last.element.nativeElement.innerHTML = result.firm.nameShort;
    this.displayStructure.last.element.nativeElement.innerHTML = result.structure.name;
  }
}
