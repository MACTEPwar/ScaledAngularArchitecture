import {
  AfterViewInit,
  ComponentFactoryResolver, Directive,
  ElementRef, Inject, Input, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { IAuthenticationService } from '../../../core/authentication/services/interfaces/i-authentication.service';
import { ITabService } from '../../tab/service/intefaces/i-tab.service';
import { TabPageDirective } from '../../tab/cmponent/tab-page.directive';
import {
  EDataType,
  TemplateEntity,
  TemplateEntityColumn
} from '../models/templateentity';
import { CudItableService } from '../services/interfaces/cud-itable.service';



export class TableModel {
  loading: boolean;
  count: number;
  pageItemsPerPage: number;
  columnTemplates: any[];
  data: any[];
  filterRules: any[];
  rowsPerPageOptions: number[];
  isShowFilter: boolean;
  selectPage: boolean;
  selectAll: boolean;
  selectRow: boolean;
  currentPage: number;
  // tslint:disable-next-line:variable-name
  selection: any[];


  constructor() {
    this.loading = true;
    this.count = 0;
    this.pageItemsPerPage = 10;
    this.columnTemplates = new Array<any>();
    this.data = new Array<any>();
    this.filterRules = new Array<any>();
    this.rowsPerPageOptions = [5, 10, 20, 50, 100];
    this.isShowFilter = false;
    this.selectPage = false;
    this.selectAll = false;
    this.selectRow = false;
    this.currentPage = 1;
    this.selection = [];
  }
}

@Directive()
export abstract class TableDirective extends TabPageDirective
  implements OnInit, AfterViewInit {

  dataKeyField: string;
  dataDisplayField: string;
  dataKeyContainer: ViewContainerRef;
  dataDisplayContainer: ViewContainerRef;
  multiselectRow = false;
  onSelectedElement: () => void;

  sideBarContainerRef: ElementRef;

  // TODO: рефакторинг!!!(убрать после удаления в наследниках)
  count;

  title = '';
  url = '';
  image = '';

  @Input() isChildren = true;

  /** Проброс перечисления для html */
  enumDataType = EDataType;
  /** Настройки таблицы для отображения */
  table: TableModel = new TableModel();
  /** Сохраненное состояние объекта таблицы */
  eventTable = null;
  /** Таблица */
  @ViewChild('dt1') dataTable;
  /**
   * Диалоговое окно (контейнер)
   */
  @ViewChild('dialog', { read: ViewContainerRef })
  dialogContainer: ViewContainerRef;
  // showDialog = false;

  protected constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') @Inject('ITabService') tabService: ITabService,
    protected service: CudItableService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(authenticationService, tabService);
  }

  //#region default implementation

  ngOnInit(): void {
    // console.log(123);
    this.initializeTable();
    if (!this.isChildren) {
      super.ngOnInit();
    }
    console.log('BIG TEST');
    console.log('this.dataKeyContainer  ------------>', this.dataKeyContainer);
  }

  ngAfterViewInit(): void { }

  //#endregion

  //#region table logic

  /** Инициализирует таблицу */
  initializeTable(): void {
    this.getCount();
    this.getTableTemplate();
    this.getColumnsRules();
  }

  /** Обновляет данные в таблице */
  refreshTable(): void {
    // console.log('test refreshTable');
    this.getDataLazy();
  }

  /**
   * Возвращает можно ли сортировать поле
   * @param model модель
   * @param field название поля
   * @returns true если можно
   */
  isSorted(model, field): boolean {
    if (!this.table.filterRules || this.table.filterRules.length === 0) {
      return;
    }
    model = model[0].toUpperCase() + model.slice(1);
    field = field[0].toUpperCase() + field.slice(1);
    return (
      this.table.filterRules.filter(
        (f) => f.nameModel === model && f.nameField === field
      )[0]?.orderAllows.length > 1
    );
  }

  /**
   * Возвращает можно ли фильтровать поле
   * @param model модель
   * @param field поле
   * @returns true если можно
   */
  isFiltered(model, field): boolean {
    if (!this.table.filterRules || this.table.filterRules.length === 0) {
      return;
    }
    model = model[0].toUpperCase() + model.slice(1);
    field = field[0].toUpperCase() + field.slice(1);
    return (
      this.table.filterRules.filter(
        (f) => f.nameModel === model && f.nameField === field
      )[0]?.conditionAllows.length > 0
    );
  }

  /**
   * Пересчитывает отображения для выбранных строк в таблице
   */
  refreshSelectState(): void {
    // console.log('test refreshSelectState');
    this.table.selectRow = this.table?.selection?.length > 0;

    this.table.selectPage = true;

    this.table.data.forEach((d) => {
      if (this.table?.selection) {
        // console.log(this.dataTable?.selection);
        // console.log(this.dataTable?.selection?.map(m => m.codeM).includes(d.codeM));
        if (!this.table?.selection?.map((m) => m.codeM).includes(d.codeM)) {
          this.table.selectPage = false;
          return;
        }
      } else {
        this.table.selectPage = false;
      }
    });

    this.table.selectAll = this.table?.selection?.length === this.table.count;
  }

  /**
   * При выборе записи (чекбокс)
   * @param flag Состояние чекбокса
   */
  onRowSelect(flag: boolean): void {
    if (this.multiselectRow) {
      // TODO: реализовать множественный выбор, если нужно
    } else {
      const selection = this.table.selection[0];

      this.dataKeyField = this.dataKeyField[0].toLowerCase() + this.dataKeyField.slice(1);
      this.dataDisplayField = this.dataDisplayField[0].toLowerCase() + this.dataDisplayField.slice(1);

      this.dataKeyContainer.element.nativeElement.value = selection[this.dataKeyField];
      if (Array.isArray(selection[this.dataDisplayField])) {
        // tslint:disable-next-line:max-line-length
        this.dataDisplayContainer.element.nativeElement.innerHTML = selection[this.dataDisplayField].filter(f => f.language === 'uk')[0]?.name;
      } else {
        this.dataDisplayContainer.element.nativeElement.innerHTML = selection[this.dataDisplayField];
      }

      this.table.selection = [];
    }

    this.onSelectedElement();
    this.refreshSelectState();
  }

  /**
   * При нажатии на "выбрать все на странице" или "снять все выделения (на странице)"
   * @param e событие
   */
  onSelectedOrUnselectedPage(e): void {
    if (this.table.selectPage) {
      this.table.data.forEach((d) => {
        if (!this.table.selection.map((m) => m.codeM).includes(d.codeM)) {
          this.table.selection.push(d);
        }
      });
    } else {
      if (this.table.selection) {
        this.table.selection = this.table.selection.filter(
          (f) => !this.table.data.map((m) => m.codeM).includes(f.codeM)
        );
      }
    }
    this.refreshSelectState();
  }

  /**
   * Снимает выделенные элементы на всех страницах
   */
  unselectAll(): void {
    this.table.selection = [];
    this.refreshSelectState();
  }

  /**
   * При выборе даты в фильтре
   * @param e событие
   * @param col элемент
   */
  onSelectFilterDate(e, col): void {
    const t: string = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    this.dataTable.filter(t, col.ModelName + '.' + col.FieldName, 'equal');
  }

  /**
   * При задействовании пагинации
   * @param event событие
   */
  onPagingClick(event?): void { }

  //#endregion

  //#region call service

  /**
   * Получает правила для колонок таблицы
   */
  getColumnsRules(): void {
    this.service
      .getFilter()
      .pipe()
      .subscribe((filter) => {
        this.table.filterRules = filter.rules;
      });
  }

  /**
   * Получает количество записей в таблице
   */
  getCount(): void {
    this.service
      .getCount()
      .pipe()
      .subscribe((count) => (this.table.count = count as number));
  }

  /**
   * Получает шаблон колонок таблицы
   */
  getTableTemplate(): void {
    this.service
      .getTemplate(true)
      .pipe()
      .subscribe((template) => {
        const mytemplate = this.backTemplateModel2myTempldateModel(template);
        // console.log('getTableTemplate');
        this.table.columnTemplates = mytemplate.Columns;
        // console.log(this.table.columnTemplates);
      });
  }

  /**
   * Получает данные по всем выбранным критериям
   * @param [event] событие
   */
  getDataLazy(event?): void {
    this.eventTable = event || this.eventTable;
    this.table.loading = true;
    const paging = {
      page: (this.eventTable?.first / this.eventTable?.rows || 0) + 1,
      pageItems: this.eventTable?.rows || 10,
    };

    this.table.currentPage = paging.page;

    this.service
      .getItems(
        this.eventTable && this.eventTable.filters
          ? this.frontFilter2backEasyFilter(this.eventTable)
          : [],
        [],
        paging
      )
      .subscribe((data) => {
        this.table.data = (data?.items || []).map((m) => {
          m.selected = this.table.selectAll;
          return m;
        });
        if (this.table.data.length === 0) {
          const obj = {};
          this.table.columnTemplates
            .map((m) => m.FieldName)
            .forEach((f) => {
              obj[f] = '';
            });
          this.table.data.push(obj);
        }
        this.table.count = data?.filter?.paging?.items || 0;
        this.refreshSelectState();
        this.table.loading = false;
      });
  }

  //#endregion

  //#region helpers (пока не дописан бэк)

  /**
   * TODO: рефакторинг!!!(убрать после доработки бэка)
   * Переводи модель фильтра с фрона на бэк
   * @param event событие
   * @returns бэковый фильтр
   */
  frontFilter2backEasyFilter(event): any {
    const resultFilter = [];
    for (const key in event.filters) {
      if (event.filters.hasOwnProperty(key)) {
        const temp = key.split('.');
        const modelName = temp[0][0].toUpperCase() + temp[0].slice(1);
        const fieldName = temp[1][0].toUpperCase() + temp[1].slice(1);
        const filterObj = {
          namemodel: modelName,
          namefield: fieldName,
          value: event.filters[key].value,
        };
        resultFilter.push(filterObj);
      }
    }
    if (event.sortField) {
      const temp = event.sortField.split('.');
      const modelName = temp[0][0].toUpperCase() + temp[0].slice(1);
      const fieldName = temp[1][0].toUpperCase() + temp[1].slice(1);
      const filterObj = {
        namemodel: modelName,
        namefield: fieldName,
        order: event.sortOrder < 0 ? 'desc' : 'asc',
      };
      const old = resultFilter.filter(
        (f) =>
          f.namemodel === filterObj.namemodel &&
          f.namefield === filterObj.namefield
      )[0];
      if (old) {
        old.order = filterObj.order;
      } else {
        resultFilter.push(filterObj);
      }
    }
    return resultFilter;
  }

  /**
   * TODO: рефакторинг!!!(убрать после доработки бэка)
   * Пеервожу Димыну структуру в свою
   * @param templteModel модель с бэка
   * @returns фронтовая модель
   */
  backTemplateModel2myTempldateModel(
    templteModel: BackEndTemplateModel
  ): TemplateEntity {
    const templateEntity = new TemplateEntity();
    let temp: TemplateEntityColumn;

    templteModel.fields.forEach((field: Field) => {
      temp = new TemplateEntityColumn();
      temp.Type = this.backFieldType2FrontFieldType(field.type);
      temp.ModelName = templteModel.model;
      temp.FieldName = field.field[0].toLowerCase() + field.field.slice(1);

      temp.DisplayName = field?.title || '';
      temp.ColumnSetings.MinLength = field?.minLength || null;
      temp.ColumnSetings.MaxLength = field?.maxLength || null;
      temp.ColumnSetings.IsRequired = field?.rquired || false;
      temp.ColumnSetings.OnlyRead = field?.editable || true;
      temp.ColumnSetings.Precission = field?.precission || 2;

      templateEntity.Columns.push(temp);
    });
    return templateEntity;
  }

  /**
   * TODO: рефакторинг!!!(убрать после доработки бэка)
   * Консолидирую бэковские типы и фронтовые
   * @param type тип
   * @returns фронтовый тип
   */
  backFieldType2FrontFieldType(type: string): EDataType {
    switch (type) {
      case 'System.String': {
        return EDataType.STRING_CONTAINS;
        break;
      }
      case 'System.DateTime': {
        return EDataType.DATE_TIME_EQUAL;
        break;
      }
      case 'System.Boolean': {
        return EDataType.CHECKED;
        break;
      }
      case 'System.DateTime': {
        return EDataType.DATE_TIME_EQUAL;
        break;
      }
      case 'Locale[]': {
        return EDataType.STRING_CONTAINS;
        break;
      }
      default: {
        return EDataType.STRING_CONTAINS;
        break;
      }
    }
  }

  //#endregion
}

/**
 * TODO: рефакторинг!!!(убрать после доработки бэка)
 * Вспомогательные классы
 */
export class BackEndTemplateModel {
  model: string;
  fields: Field[];
}

/**
 * TODO: рефакторинг!!!(убрать после доработки бэка)
 * Вспомогательные классы
 */
export class Field {
  field: string;
  type: string;
  rquired: boolean;
  maxLength?: number;
  minLength?: number;
  title: string;
  editable: boolean;
  precission: number;
}
