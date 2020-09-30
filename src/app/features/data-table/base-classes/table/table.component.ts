import { error } from '@angular/compiler/src/util';
import {
  AfterViewInit,
  ComponentFactoryResolver, Directive,
  Inject,
  Input,
  OnDestroy, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { getDatePickerSettingsByLocale } from '../../../../core/localization/date-picker-locales';
import { TranslateService } from '@ngx-translate/core';
// import { stirng2faIcon as s2fi } from '../../../../core/helper/helper-functions';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { TabPageDirective } from '../../../tab/cmponent/tab-page.directive';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { DeviceLinkComponent } from '../../components/device-link/device-link.component';
import {
  Constant, EDataType,
  TemplateEntity,
  TemplateEntityColumn
} from '../../models/template-entity';
import { IdatatableService } from '../../services/Interfaces/idatatable.service';
import { Router } from '@angular/router';

export class TableModel {
  loading: boolean;
  count: number;
  pageItemsPerPage: number;
  columnTemplates: Array<TemplateEntityColumn>;
  data: any[];
  filterRules: any[];
  sessionKey: string;
  rowsPerPageOptions: number[];
  isShowFilter: boolean;
  selectPage: boolean;
  selectAll: boolean;
  selectRow: boolean;
  currentPage: number;
  displayChangeCoumns: boolean;
  constants: Array<Constant>;

  // tslint:disable-next-line:variable-name
  private _selection: any[];
  get selection(): any[] {
    return this._selection;
  }
  set selection(value: any[]) {
    this._selection = value;
    const sess: any = JSON.parse(sessionStorage.getItem(this.sessionKey));
    if (sess) {
      sess.selection = this.selection;
      sessionStorage.setItem(this.sessionKey, JSON.stringify(sess));
    }
  }

  // tslint:disable-next-line:variable-name
  private _selectedColumns: any[];
  get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    this._selectedColumns = this.columnTemplates.filter(col => val.includes(col));
  }



  constructor() {
    this.loading = true;
    this.count = 0;
    this.pageItemsPerPage = 10;
    this.columnTemplates = new Array<TemplateEntityColumn>();
    this.selectedColumns = new Array<any>();
    this.data = new Array<any>();
    this.filterRules = new Array<any>();
    this.sessionKey = '';
    this.rowsPerPageOptions = [5, 10, 20, 50, 100];
    this.isShowFilter = false;
    this.selectPage = false;
    this.selectAll = false;
    this.selectRow = false;
    this.currentPage = 1;
    this.selection = [];
    this.displayChangeCoumns = false;
    this.constants = new Array<Constant>();
  }
}

@Directive()
export abstract class TableDirective extends TabPageDirective
  implements OnInit, AfterViewInit, OnDestroy {
  // TODO: рефакторинг!!!(убрать после удаления в наследниках)
  count;

  title = '';
  url = '';
  image = '';

  createInNewTab = false;

  // stirng2faIcon: any = s2fi;

  @Input() isChildren = false;

  tempSelectedClumns: any[] = [];

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

  @ViewChild('linkedDataList', { read: ViewContainerRef })
  linkedDataListContainer: ViewContainerRef;

  showLinkedData = false;
  linkedFields: string[] = [];
  sidebarLinkedDataListDisplay = false;

  protected constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') @Inject('ITabService') tabService: ITabService,
    protected service: IdatatableService,
    private cudService: CUDService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private translateService: TranslateService,
    private router?: Router
  ) {
    super(authenticationService, tabService);
  }

  //#region default implementation

  ngOnInit(): void {
    // console.log(123);

    // console.log('CURRENT_LANG_TABLE   --->  ', this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(s => {
      // this.table.loading = true;
      this.initializeTable();
      // this.getDataLazy();
    });

    this.initializeTable();
    if (!this.isChildren) {
      super.ngOnInit();
    }
    console.log('BIG TEST');
    console.log(this.isChildren);
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void {
    // this.translateService.onLangChange.unsubscribe();
  }

  //#endregion

  //#region calling modal

  /** Вызывает модальное окно для создания новго объекта */
  create(): void {
    if (this.createInNewTab) {
      this.router.navigate(['catalogs/firm/create']);
    } else {
      this.dialogContainer.clear();
      const type = this.cudService.getCreateTypeModal(
        this.service.getController()
      );
      const createDialogComponent = this.componentFactoryResolver.resolveComponentFactory(
        type
      );
      const createDialogComponentRef = this.dialogContainer.createComponent(
        createDialogComponent
      );

      createDialogComponentRef.instance.onCreated = () => {
        this.dialogContainer.clear();
        this.getDataLazy();
      };

      createDialogComponentRef.instance.service = this.service;
      createDialogComponentRef.instance.containerRef = this.dialogContainer;
    }
  }

  /** Вызывает модальное окно для редактирования объекта */
  update(): void {
    this.dialogContainer.clear();
    const type = this.cudService.getUpdateTypeModal(
      this.service.getController()
    );
    const updateDialogComponent = this.componentFactoryResolver.resolveComponentFactory(
      type
    );
    const updateDialogComponentRef = this.dialogContainer.createComponent(
      updateDialogComponent
    );
    updateDialogComponentRef.instance.service = this.service;
    updateDialogComponentRef.instance.containerRef = this.dialogContainer;

    updateDialogComponentRef.instance.onUpdated = () => {
      this.table.selection = [];
      this.dialogContainer.clear();
      this.getDataLazy();
    };


    const PKs = this.getPrimaryKeys();
    // если ключ составной
    if (PKs.length > 1) {
      // если выбран один эл-нт
      const obj = {};
      PKs.forEach((pk) => (obj[pk] = this.table.selection[0][pk]));
      updateDialogComponentRef.instance.keys = JSON.stringify(obj);
    }
    // если ключ простой
    else {
      updateDialogComponentRef.instance.keys = this.table.selection[0][
        PKs[0]
      ];
    }
  }

  /** Вызывает модальное окно для удаления одного или нескольких объектов */
  delete(): void {
    this.dialogContainer.clear();
    const type = this.cudService.getDeleteTypeModal(
      this.service.getController()
    );
    const deleteDialogComponent = this.componentFactoryResolver.resolveComponentFactory(
      type
    );
    const deleteDialogComponentRef = this.dialogContainer.createComponent(
      deleteDialogComponent
    );
    deleteDialogComponentRef.instance.service = this.service;
    deleteDialogComponentRef.instance.containerRef = this.dialogContainer;
    deleteDialogComponentRef.instance.onDeleted = () => {
      this.table.selection = [];
      this.getDataLazy();
    };

    const PKs = this.getPrimaryKeys();
    // если ключ составной
    if (PKs.length > 1) {
      // если выбран один эл-нт
      if (this.table.selection.length === 1) {
        const obj = {};
        PKs.forEach((pk) => (obj[pk] = this.table.selection[0][pk]));
        deleteDialogComponentRef.instance.keys = JSON.stringify(obj);
      }
      // если выбрано несколько эл-ов
      else if (this.table.selection.length > 1) {
        // TODO: исправить, когда на бэке будут методы
        throw error('множественное удаление не поддерживается');
        const JSON_PK_SELECTIONS = this.table?.selection?.map((m) => {
          const obj = {};
          PKs.forEach((pk) => (obj[pk] = m[pk]));
          return JSON.stringify(obj);
        });
        deleteDialogComponentRef.instance.keys = JSON_PK_SELECTIONS;
      }
    }
    // если ключ простой
    else {
      // если выбран один эл-нт
      if (this.table.selection.length === 1) {
        deleteDialogComponentRef.instance.keys = this.table.selection[0][
          PKs[0]
        ];
      }
      // если выбрано несколько эл-ов
      else if (this.table.selection.length > 1) {
        // TODO: исправить, когда на бэке будут методы
        throw error('множественное удаление не поддерживается');
        deleteDialogComponentRef.instance.keys = this.table.selection?.map(
          (m) => m[PKs[0]]
        );
      }
    }
  }

  toggleModalChangeColumns(state: boolean): void {
    this.tempSelectedClumns = this.table.selectedColumns;
    this.table.displayChangeCoumns = state;
  }

  //#endregion

  //#region table logic

  /** Инициализирует таблицу */
  initializeTable(): void {
    this.setSessionKey();
    this.getCount();
    this.getTableTemplate();
    this.getColumnsRules();
  }

  showLinkedList(rowData: any): void {
    const linkedPk = rowData[this.getPrimaryKeys()[0]];

    this.linkedDataListContainer.clear();
    const type = DeviceLinkComponent;
    const createDialogComponent = this.componentFactoryResolver.resolveComponentFactory(
      type
    );
    const createDialogComponentRef = this.linkedDataListContainer.createComponent(
      createDialogComponent
    );
    this.sidebarLinkedDataListDisplay = true;

    createDialogComponentRef.instance.filterId = linkedPk;

    // createDialogComponentRef.instance.onCreated = () => {
    //   this.linkedDataListContainer.clear();
    //   this.getDataLazy();
    // };

    // createDialogComponentRef.instance.service = this.service;
    // createDialogComponentRef.instance.containerRef = this.dialogContainer;
  }

  /**
   * олучает первичные ключи таблицы
   * @returns список названий колонок-ключей
   */
  getPrimaryKeys(): string[] {
    return this.table.columnTemplates
      .filter((f) => f.Key)
      .map((m) => m.FieldName);
  }

  /** Обновляет данные в таблице */
  refreshTable(): void {
    // console.log('test refreshTable');
    this.getDataLazy();
  }

  // TODO: не нужна, потом убрать
  refreshData(event?): void {
    // console.log('START REFRESH');
    const paging = {
      page: (event?.first / event?.rows || 0) + 1,
      pageItems: event?.rows || 10,
    };
    this.table.loading = true;

    this.service
      .getTemplate(true)
      .pipe()
      .subscribe((template) => {
        this.fields = template.Columns;
        this.service
          .getFilter()
          .pipe()
          .subscribe((filter) => {
            this.service
              .getItems(
                event && event.filters
                  ? this.frontFilter2backEasyFilter(event.filters)
                  : [],
                [],
                paging
              )
              .subscribe((data) => {
                this.table.data = data.items;
                this.table.loading = false;
              });
          });
      });
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
   * Проверяю содержится ли элемента одного массива в другом (выбранных объектов с пришедшими) в разрезе ПК
   * @param data Данные
   */
  test(data): boolean {
    if (
      this.dataTable?.selection
        ?.map((m) => {
          const obj = {};
          this.getPrimaryKeys().forEach((PK) => {
            obj[PK] = m[PK];
          });
          return JSON.stringify(obj);
        })
        .filter((selection) => {
          const obj = {};
          this.getPrimaryKeys().forEach((PK) => {
            obj[PK] = data[PK];
          });
          return JSON.stringify(obj) === selection;
        }).length > 0
    ) {
      return true;
    } else {
      return false;
    }
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

        if (!this.test(d)) {
          this.table.selectPage = false;
          return;
        }

        // if (!this.table?.selection?.map(m => m.codeM).includes(d.codeM)) {
        //   this.table.selectPage = false;
        //   return;
        // }
      } else {
        this.table.selectPage = false;
      }
    });

    this.table.selectAll = this.table?.selection?.length === this.table.count;
    console.log('this.table.selectPage ----->', this.table.selectPage);
  }

  /**
   * При подтверждении выбранных колонок
   */
  changeSelectedColumns(): void {
    this.table.selectedColumns = this.tempSelectedClumns;
  }

  /**
   * При выборе записи (чекбокс)
   * @param flag Состояние чекбокса
   */
  onRowSelect(flag: boolean): void {
    // this.refreshTable();
    // console.log('onRowSelect');
    this.refreshSelectState();
  }

  /**
   * При нажатии на "выбрать все на странице" или "снять все выделения (на странице)"
   * @param e событие
   */
  onSelectedOrUnselectedPage(e): void {
    console.log('test onSelectedOrUnselectedPage');
    console.log(this.table.selectPage);
    if (this.table.selectPage) {
      // if (!this.dataTable.selection) {
      //   this.dataTable.selection = [];
      // }
      // this.table.data.forEach(d => { this.dataTable.selection.push(d); });
      this.table.data.forEach((d) => {
        // if (!this.table.selection.map(m => m.codeM).includes(d.codeM)) {
        if (!this.test(d)) {
          this.table.selection.push(d);
        }
      });
    } else {
      if (this.table.selection) {
        // this.dataTable.selection = this.dataTable.selection.filter(f => !this.table.data.map(m => m.codeM).includes(f.codeM));
        this.table.selection = this.table.selection.filter(
          (f) => !this.test(f)
        );
      }
    }
    console.log(this.table.selection);
    this.refreshSelectState();
    // this.getDataLazy();
  }

  /**
   * Снимает выделенные элементы на всех страницах
   */
  unselectAll(): void {
    // this.dataTable.selection = [];
    this.table.selection = [];
    this.refreshSelectState();
    // this.getDataLazy();
  }

  /**
   * Получает настройки для датапикера с текущей локалью
   */
  public loadDatePickerSettingWithLocale(): any {
    return getDatePickerSettingsByLocale(this.translateService.currentLang);
  }

  /**
   * При выборе даты в фильтре
   * @param e событие
   * @param col элемент
   */
  onSelectFilterDate(e, col): void {
    console.log(e);
    if (!e.type) {
      const t: string = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
      this.dataTable.filter(t, col.ModelName + '.' + col.FieldName, 'equal');
    } else {
      this.dataTable.filter('', col.ModelName + '.' + col.FieldName, 'equal');
    }
  }

  /**
   * Скрывает/показывает фильтр
   */
  toggleFilterToolbar(): void {
    console.log(this.table.isShowFilter);
    this.table.isShowFilter = !this.table.isShowFilter;
  }

  /**
   * Получает текущий год
   */
  public getCurrentYear = (): number => new Date().getFullYear();

  /**
   * При задействовании пагинации
   * @param event событие
   */
  onPagingClick(event?): void { }

  /**
   * Получает ключ для хранения информации о табице в сессии
   * @returns ключ
   */
  getSessionKey(): string {
    return 'filter' + this.url.slice(1);
  }

  /**
   * Устанавливает ключ сессии для данной таблицы
   */
  setSessionKey(): void {
    this.table.sessionKey = this.getSessionKey();
  }

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
        this.table.constants = mytemplate.Contants;
        this.table.selectedColumns = this.table.columnTemplates;
        this.tempSelectedClumns = this.table.columnTemplates;
        // console.log(this.table.columnTemplates);
        console.log('SUPER TABLE --->', this.table);
      });
  }

  /**
   * Получает данные по всем выбранным критериям
   * @param [event] событие
   */
  getDataLazy(event?): void {
    // console.log('test getDataLazy');
    this.eventTable = event || this.eventTable;
    this.table.loading = true;
    console.log(this.table.selection);
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
      temp.BackEndType = field.type;
      temp.Type = this.backFieldType2FrontFieldType(field.type);
      temp.ModelName = templteModel.model;
      temp.FieldName = field.field[0].toLowerCase() + field.field.slice(1);
      temp.Key = field?.key || false;

      temp.DisplayName = field?.title || '';
      temp.ColumnSetings.MinLength = field?.minLength || null;
      temp.ColumnSetings.MaxLength = field?.maxLength || null;
      temp.ColumnSetings.IsRequired = field?.rquired || false;
      temp.ColumnSetings.OnlyRead = field?.editable || true;
      temp.ColumnSetings.Precission = field?.precission || 2;

      temp.ColumnSetings.DataField = field?.data_field || null;
      temp.ColumnSetings.DataLink = field?.data_link || null;
      temp.ColumnSetings.DataKeyField = field?.data_key_field || null;

      templateEntity.Columns.push(temp);
    });

    templateEntity.Columns.filter(f => f.Type === EDataType.OBJECT).forEach(f => {
      const field = templateEntity.Columns.filter(s => s.ColumnSetings.DataLink === f.FieldName[0].toUpperCase() + f.FieldName.slice(1))[0];
      if (field) {
        f.ColumnSetings.DataLink = field.ColumnSetings.DataLink[0].toLowerCase() + field.ColumnSetings.DataLink.slice(1);
        f.ColumnSetings.DataField = field.ColumnSetings.DataField[0].toLowerCase() + field.ColumnSetings.DataField.slice(1);
      }
    });

    templateEntity.Columns.filter(f => f.Type === EDataType.CONSTANT).forEach(async f => {
      const constants = await this.getConstant(f.BackEndType);
      constants.forEach(constant => {
        templateEntity.Contants.push(new Constant(f.BackEndType, constant.label, constant.value));
      });
    });
    return templateEntity;
  }

  /**
   * Отдает описание константы
   * @param type тип константы
   * @param value значение константы
   */
  getConstantLabelByTypeAndValue(type: string, value: string): string {
    return this.table.constants.filter(f => f.ConstantType === type && f.Value === value)[0]?.Label || 'Не определено';
  }

  /**
   * Получает константу по типу (асинхронная)
   * @param type тип
   */
  async getConstant(type: string): Promise<any> {
    return await this.service.getConstant(type).toPromise();
  }

  /**
   * TODO: рефакторинг!!!(убрать после доработки бэка)
   * Консолидирую бэковские типы и фронтовые
   * @param type тип
   * @returns фронтовый тип
   */
  backFieldType2FrontFieldType(type: string): EDataType {
    if (type.startsWith('Altius.BLL.DTO')) {
      return EDataType.OBJECT;
    }
    if (type.startsWith('System.Collections.Generic.IList`1')) {
      return EDataType.LIST_OF_OBJECTS;
    }
    if (type.startsWith('Altius.Com.Constants')) {
      return EDataType.CONSTANT;
    }
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
      // case 'Nullable`1': {
      //   return EDataType.DATE_TIME_EQUAL;
      //   break;
      // }
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
  key: boolean;
  // tslint:disable-next-line:variable-name
  data_link: string;
  // tslint:disable-next-line:variable-name
  data_field: string;
  // tslint:disable-next-line:variable-name
  data_key_field: string;
}
