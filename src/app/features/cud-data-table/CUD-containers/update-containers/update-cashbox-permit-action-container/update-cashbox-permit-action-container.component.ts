import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ElementRef, ViewChildren, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CashboxPermitComponent } from '../../../components/cashboxPermit/cashboxPermit.component';

@Component({
  selector: 'al-update-cashbox-permit-action-container',
  templateUrl: './update-cashbox-permit-action-container.component.html',
  // styleUrls: ['./update-cashbox-permit-action-container.component.scss']
})
export class UpdateCashboxPermitActionContainerComponent extends CudUpdateBase implements OnInit, AfterViewInit, ICudUpdate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  @ViewChildren('keyCashboxPermit', { read: ViewContainerRef })
  keyCashboxPermit: any;
  @ViewChildren('displayCashboxPermit', { read: ViewContainerRef })
  displayCashboxPermit: any;

  profileForm = new FormGroup({
    Id: new FormControl(''),
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

  result2Form = (result: any): void => {
    this.profileForm.setValue({
      CashboxPermitCode: result.cashboxPermitCode,
      Code: result.code,
      Name: result.name,
      Info: result.info,
      IsAction: result.isAction,
      Id: result.id
    });

    this.displayCashboxPermit.last.element.nativeElement.innerHTML = result.cashboxPermit.name;
  }
}
