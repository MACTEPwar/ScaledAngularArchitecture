import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ElementRef, ViewChildren, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FirmComponent, StructureComponent, DeviceModelComponent, CashboxComponent } from '../../../components';

@Component({
  selector: 'al-update-device-container',
  templateUrl: './update-device-container.component.html',
  styleUrls: ['./update-device-container.component.scss']
})
export class UpdateDeviceContainerComponent extends CudUpdateBase implements OnInit, AfterViewInit, ICudUpdate {

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

  @ViewChildren('keyDeviceModel', { read: ViewContainerRef })
  keyDeviceModel: any;
  @ViewChildren('displayDeviceModel', { read: ViewContainerRef })
  displayDeviceModel: any;

  @ViewChildren('keyCashbox', { read: ViewContainerRef })
  keyCashbox: any;
  @ViewChildren('displayCashbox', { read: ViewContainerRef })
  displayCashbox: any;

  profileForm = new FormGroup({
    Id: new FormControl('', Validators.required),
    FirmCode: new FormControl('', Validators.required),
    StructureId: new FormControl(''),
    DeviceModelId: new FormControl('', Validators.required),
    CashboxId: new FormControl(''),
    Type: new FormControl('', Validators.required),
    NumberSerial: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    NumberFactory: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    Info: new FormControl('', [Validators.minLength(0), Validators.maxLength(250)])
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

    this.keyDeviceModel.changes.subscribe(key => {
      this.displayDeviceModel.changes.subscribe(display => {
        this.contRef.push({
          link: 'DeviceModel',
          fieldId: 'DeviceModelId',
          type: DeviceModelComponent,
          key: key.last,
          display: display.last
        });
      });
    });

    this.keyCashbox.changes.subscribe(key => {
      this.displayCashbox.changes.subscribe(display => {
        this.contRef.push({
          link: 'Cashbox',
          fieldId: 'CashboxId',
          type: CashboxComponent,
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
      DeviceModelId: result.deviceModelId,
      CashboxId: result.cashboxId,
      Type: result.type,
      NumberSerial: result.numberSerial,
      NumberFactory: result.numberFactory,
      Info: result.info,
      Id: result.id
    });

    this.displayFirm.last.element.nativeElement.innerHTML = result.firm.nameShort.filter(f => f.language === this.translateService.currentLang)[0].name;
    this.displayStructure.last.element.nativeElement.innerHTML = result.structure.name.filter(f => f.language === this.translateService.currentLang)[0].name || '';
    this.displayDeviceModel.last.element.nativeElement.innerHTML = result.deviceModel.model || '';
    this.displayCashbox.last.element.nativeElement.innerHTML = result.cashbox.name.filter(f => f.language === this.translateService.currentLang)[0].name;
  }
}
