
import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';
import {CashboxPermitComponent} from '../../../components/cashboxPermit/cashboxPermit.component';

@Component({
  selector: 'al-create-cashboxpermitaction-container',
  templateUrl: './create-cashboxpermitaction-container.component.html'
})
export class CreateCashboxpermitactionContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  @ViewChildren('keyCashboxPermit', { read: ViewContainerRef })
  keyCashboxPermit: any;
  @ViewChildren('displayCashboxPermit', { read: ViewContainerRef })
  displayCashboxPermit: any;

  profileForm = new FormGroup({
    CashboxPermitCode: new FormControl('', Validators.required),
    Code: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
    Name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
    Info: new FormControl('', [Validators.minLength(0), Validators.maxLength(250)]),
    IsAction: new FormControl(false),
  });

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService);
  }

  ngAfterViewInit(): void {
    this.keyCashboxPermit.changes.subscribe(key => {
      this.displayCashboxPermit.changes.subscribe(display => {
        this.contRef.push({
          link: 'CashboxPermit',
          fieldId: 'CashboxPermitCode',
          type: CashboxPermitComponent,
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
