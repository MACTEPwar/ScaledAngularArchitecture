import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ElementRef, ViewChildren, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FirmComponent } from '../../../components';

@Component({
  selector: 'al-update-structure-container',
  templateUrl: './update-structure-container.component.html',
  // styleUrls: ['./update-structure-container.component.scss']
})
export class UpdateStructureContainerComponent extends CudUpdateBase implements OnInit, AfterViewInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  @ViewChildren('keyFirm', { read: ViewContainerRef })
  keyFirm: any;
  @ViewChildren('displayFirm', { read: ViewContainerRef })
  displayFirm: any;

  profileForm = new FormGroup({
    Id: new FormControl('', Validators.required),
    FirmCode: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required),
    Number: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(25)]),
    Name: new FormArray([
      // tslint:disable-next-line:max-line-length
      new FormGroup({name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]), language: new FormControl('ru')}),
      // tslint:disable-next-line:max-line-length
      new FormGroup({name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]), language: new FormControl('uk')})
    ]),
    LocationAddress: new FormControl('', [ Validators.minLength(0), Validators.maxLength(250)]),
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
  }

  result2Form = (result: any): void => {
    this.profileForm.setValue({
      FirmCode: result.firmCode,
      Type: result.type,
      Number: result.number,
      Name: result.name,
      LocationAddress: result.locationAddress,
      Info: result.info,
      Id: result.id,
    });

    const firmWithLocale = result.firm.nameShort.filter(f => f.language === this.translateService.currentLang)[0].name;
    this.displayFirm.last.element.nativeElement.innerHTML = firmWithLocale;
  }

}
