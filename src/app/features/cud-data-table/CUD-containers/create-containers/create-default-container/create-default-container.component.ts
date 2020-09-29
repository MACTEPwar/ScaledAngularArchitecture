import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Type,
  ComponentFactoryResolver,
} from '@angular/core';
import { CudItableService } from '../../../services/interfaces/cud-itable.service';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ValidatorFn,
} from '@angular/forms';

// import { BanksComponent } from '../../../components/banks/banks.component';
import { EmployeeComponent } from '../../../components/employee/employee.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'al-create-default-container',
  templateUrl: './create-default-container.component.html',
  styleUrls: ['./create-default-container.component.scss'],
})
export class CreateDefaultContainerComponent implements OnInit {
  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;

  service: CudItableService;
  item: any;
  template: any = {};
  containerRef: any;
  profileForm = new FormGroup({});

  sidebarDisplay = false;

  errors = [
    {
      dateType: 'System.String',
      errorType: 'required',
      errorMessage: 'Строка обязательна к заполнению',
    },
    {
      dateType: 'System.String',
      errorType: 'minLength',
      errorMessage: 'Минимальное кол-во символов больше введенного',
    },
    {
      dateType: 'System.String',
      errorType: 'maxLength',
      errorMessage: 'Превышает лимит символов',
    },

    {
      dateType: 'System.DateTime',
      errorType: 'required',
      errorMessage: 'Дата обязательна к заполнению',
    },

    {
      dateType: 'System.Int32',
      errorType: 'required',
      errorMessage: 'Строка обязательна к заполнению',
    },
  ];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.service
      .getTemplate(false)
      .pipe()
      .subscribe((template) => {
        this.template = template;
        console.log(this.template);
        this.generateFormGroupByFullTemplate();
        console.log(this.profileForm);
      });
  }

  create(): void {
    if (!this.profileForm.invalid) {
      console.log(this.profileForm.value);
      const formData = { ...this.profileForm.value };
      console.log('Данные формы: ', formData);
      this.service.putItem(this.profileForm.value).pipe().subscribe();
    }
  }

  close(): void {
    this.containerRef.clear();
  }

  getErrorByDateTypeAndErrortype(dateType: string, errorType: string): string {
    return this.errors.filter(
      (f) => f.dateType === dateType && f.errorType === errorType
    )[0]?.errorMessage;
  }

  // TODO: доработать
  getTypeByBackType(type: string): Type<any> {
    // if (type === 'Firm') {
    //   return EmployeeComponent;
    // }
    // return BanksComponent;
    // return CurrencyComponent;
    return EmployeeComponent;
    return null;
  }

  displayLinkedData(type: string): void {
    this.bottomSidebarDialog.clear();
    const curType = this.getTypeByBackType(type);
    const tableComponent = this.componentFactoryResolver.resolveComponentFactory(
      curType
    );
    const tableComponentRef = this.bottomSidebarDialog.createComponent(
      tableComponent
    );
    tableComponentRef.instance.isChildren = true;

    // (createDialogComponentRef.instance).service = this.service;
    // (createDialogComponentRef.instance).containerRef = this.dialogContainer;

    this.sidebarDisplay = true;
  }

  generateFormGroupByFullTemplate(): void {
    this.template.fields.forEach((field) => {
      switch (field.type) {
        case 'System.String': {
          if (field.multilang) {
            const groups: FormGroup[] = [];
            this.getAllLanguages().forEach((language) => {
              const validators: ValidatorFn[] = [];

              if (field.required) {
                validators.push(Validators.required);
              }
              if (field.minLength) {
                validators.push(Validators.minLength(field.minLength));
              }
              if (field.maxLength) {
                validators.push(Validators.maxLength(field.maxLength));
              }

              const tempGroup = new FormGroup({
                name: new FormControl('', validators),
                language: new FormControl(language.language),
              });

              groups.push(tempGroup);
            });
            this.profileForm.addControl(
              field.field[0].toLowerCase() + field.field.slice(1),
              new FormArray(groups)
            );
          } else {
            const validators: ValidatorFn[] = [];

            if (field.required) {
              validators.push(Validators.required);
            }
            if (field.minLength) {
              validators.push(Validators.minLength(field.minLength));
            }
            if (field.maxLength) {
              validators.push(Validators.maxLength(field.maxLength));
            }

            this.profileForm.addControl(
              field.field[0].toLowerCase() + field.field.slice(1),
              new FormControl('', validators)
            );
          }
          break;
        }
        case 'System.DateTime': {
          this.profileForm.addControl(
            field.field[0].toLowerCase() + field.field.slice(1),
            new FormControl('')
          );
          break;
        }
        case 'System.Int32': {
          this.profileForm.addControl(
            field.field[0].toLowerCase() + field.field.slice(1),
            new FormControl('')
          );
          break;
        }
        case 'System.Boolean': {
          this.profileForm.addControl(
            field.field[0].toLowerCase() + field.field.slice(1),
            new FormControl(false)
          );
          break;
        }
        // case 'Nullable`1': {
        //   this.profileForm.addControl(field.field[0].toLowerCase() + field.field.slice(1), new FormControl(''));
        //   break;
        // }
        default: {
          break;
        }
      }
    });
  }

  getEntityDescription(): string {
    return this.template.model;
  }

  // TODO: переместить в другое место, сделать общим методом
  getAllLanguages(): any[] {
    return [
      {
        language: 'en',
        description: 'Английский',
      },
      {
        language: 'ru',
        description: 'Руский',
      },
      {
        language: 'ua',
        description: 'Украинский',
      },
    ];
  }
}
