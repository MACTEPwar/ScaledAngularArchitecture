import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ElementRef, ViewChildren, ComponentFactoryResolver } from '@angular/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FirmComponent, StructureComponent, DeviceModelComponent, CashboxComponent } from '../../../components';

@Component({
  selector: 'al-create-device-container',
  templateUrl: './create-device-container.component.html'
})
export class CreateDeviceContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

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
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService,
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

}
