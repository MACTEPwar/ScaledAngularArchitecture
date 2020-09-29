import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';
import {TaxRateComponent} from '../../../components/tax-rate/tax-rate.component';

@Component({
  selector: 'al-create-taxrate-container',
  templateUrl: './create-taxrate-container.component.html'
})
export class CreateTaxrateContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  @ViewChildren('keyAddTaxRate', { read: ViewContainerRef })
  keyAddTaxRate: any;
  @ViewChildren('displayAddTaxRate', { read: ViewContainerRef })
  displayAddTaxRate: any;

  thisYear: number;

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
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService, ['CodeNum'] );
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

  ngOnInit(): void {
    super.OnInitBase();
    this.thisYear =  new Date().getFullYear();
  }
}
