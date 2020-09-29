import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';
import { FirmComponent } from '../../../components/firm/firm.component';
import { StructureComponent } from '../../../components/structure/structure.component';

@Component({
  selector: 'al-create-store-container',
  templateUrl: './create-store-container.component.html'
})
export class CreateStoreContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

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
    Number: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(25)]),
    Name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    Info: new FormControl('', [Validators.minLength(0), Validators.maxLength(250)]),
    FirmCode: new FormControl('', Validators.required),
    StructureId: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required)
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
