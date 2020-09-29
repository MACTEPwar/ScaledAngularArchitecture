import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ViewChildren, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { CudUpdateBase } from '../../../baseclasses/cud-update-base';
import { ICudUpdate } from '../../../baseclasses/i-cud-update';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {TaxRateComponent} from '../../../components/tax-rate/tax-rate.component';

@Component({
  selector: 'al-update-taxrate-container',
  templateUrl: './update-taxrate-container.component.html'
})
export class UpdateTaxrateContainerComponent extends CudUpdateBase implements OnInit, AfterViewInit, ICudUpdate {


  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  @ViewChildren('keyAddTaxRate', { read: ViewContainerRef })
  keyAddTaxRate: any;
  @ViewChildren('displayAddTaxRate', { read: ViewContainerRef })
  displayAddTaxRate: any;

  profileForm = new FormGroup({
    DateAction:  new FormControl('', [Validators.required]),
    CodeNum: new FormControl('', Validators.required),
    CodeChar: new FormControl('', Validators.required),
    Name: new FormArray([
      new FormGroup({name: new FormControl('', [Validators.required]), language: new FormControl('ru')}),
      new FormGroup({name: new FormControl('', [Validators.required]), language: new FormControl('uk')})
    ]),
    Value: new FormControl('', Validators.required),
    AddTaxRateId: new FormControl('', Validators.required),
  });

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService, ['CodeNum']);
  }

  ngOnInit(): void {
    super.OnInitBase();
  }

  ngAfterViewInit(): void {

    this.keyAddTaxRate.changes.subscribe(key => {
      this.displayAddTaxRate.changes.subscribe(display => {
        this.contRef.push({
          link: 'AddTaxRate',
          fieldId: 'AddTaxRateId',
          type: TaxRateComponent,
          key: key.last,
          display: display.last
        });
      });
    });

  }

  result2Form = (result: any): void => {
    this.profileForm.setValue({
      DateAction: new Date(result.dateAction),
      AddTaxRateId: result.addTaxRateId,
      Name: [
        { name: result.name[0].name, language: result.name[0].language },
        { name: result.name[1].name, language: result.name[1].language },
      ],
      CodeNum: result.codeNum,
      CodeChar: result.codeChar,
      Value: result.value,
    });

    this.displayAddTaxRate.last.element.nativeElement.innerHTML = result.taxrate.name;
  }
}
