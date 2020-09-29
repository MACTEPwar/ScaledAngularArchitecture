import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ViewChildren, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirmComponent } from '../../../components/firm/firm.component';
import { StructureComponent } from '../../../components/structure/structure.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'al-update-store-container',
  templateUrl: './update-store-container.component.html',
  styleUrls: ['./update-store-container.component.scss']
})
export class UpdateStoreContainerComponent extends CudUpdateBase implements OnInit, AfterViewInit, ICudUpdate {


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
    Type: new FormControl('', Validators.required),
    Id: new FormControl('', Validators.required)
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
      Number: result.number,
      Name: result.name,
      Info: result.info,
      FirmCode: result.firmCode,
      StructureId: result.structureId,
      Type: result.type,
      Id: result.id
    });

    this.displayFirm.last.element.nativeElement.innerHTML = result.firm.nameShort;
    this.displayStructure.last.element.nativeElement.innerHTML = result.structure.name;
  }
}
