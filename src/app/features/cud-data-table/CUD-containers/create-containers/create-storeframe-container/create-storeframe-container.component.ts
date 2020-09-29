import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';
import { FirmComponent } from '../../../components/firm/firm.component';

import {StoreComponent} from '../../../components/store/store.component';

@Component({
  selector: 'al-create-storeframe-container',
  templateUrl: './create-storeframe-container.component.html'
})
export class CreateStoreframeContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  @ViewChildren('keyFirm', { read: ViewContainerRef })
  keyFirm: any;
  @ViewChildren('displayFirm', { read: ViewContainerRef })
  displayFirm: any;

  @ViewChildren('keyStore', { read: ViewContainerRef })
  keyStructure: any;
  @ViewChildren('displayStore', { read: ViewContainerRef })
  displayStructure: any;

  profileForm = new FormGroup({

    // FirmCode: new FormControl('', Validators.required),
    StoreId: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required),

    Code: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    Name: new FormArray([
      new FormGroup({name: new FormControl('', [Validators.required]), language: new FormControl('ru')}),
      new FormGroup({name: new FormControl('', [Validators.required]), language: new FormControl('uk')})
    ]),

    Info: new FormControl('', [Validators.minLength(0), Validators.maxLength(250)])
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
          link: 'Store',
          fieldId: 'StoreId',
          type: StoreComponent,
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
