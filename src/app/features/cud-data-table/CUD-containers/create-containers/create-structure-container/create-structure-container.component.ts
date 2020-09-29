import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';
import { FirmComponent } from '../../../components/firm/firm.component';

@Component({
  selector: 'al-create-structure-container',
  templateUrl: './create-structure-container.component.html'
})
export class CreateStructureContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  @ViewChildren('keyFirm', { read: ViewContainerRef })
  keyFirm: any;
  @ViewChildren('displayFirm', { read: ViewContainerRef })
  displayFirm: any;


  profileForm = new FormGroup({
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

  }

  ngOnInit(): void {
    super.OnInitBase();
  }
}
