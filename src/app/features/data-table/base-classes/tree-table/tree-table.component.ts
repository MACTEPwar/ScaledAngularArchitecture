import { AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, Directive, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Inject } from '@angular/core';
import { IAuthenticationService } from '../../../../core/authentication/services/interfaces/i-authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
// import { stirng2faIcon as s2fi } from '../../../../core/helper/helper-functions';
import { CUDService } from '../../../cud-data-table/services/concrete/cud-service.service';
import { TabPageDirective } from '../../../tab/cmponent/tab-page.directive';
import { ITabService } from '../../../tab/service/intefaces/i-tab.service';
import { Constant, EDataType, TemplateEntity, TemplateEntityColumn } from '../../models/template-entity';
import { ITreeTableService } from '../../services/Interfaces/i-tree-table.service';
import { error } from '@angular/compiler/src/util';

export class TableModel {
  filter: any;
  loading: boolean;
  count: number;
  pageItemsPerPage: number;
  // columnTemplates: Array<TemplateEntityColumn>;
  // tslint:disable-next-line:variable-name
  private _columnTemplates: Array<TemplateEntityColumn>;
  get columnTemplates(): Array<TemplateEntityColumn> {
    return this._columnTemplates;
  }

  set columnTemplates(value: Array<TemplateEntityColumn>) {
    this._columnTemplates = value;
    console.log('this._columnTemplate --->', this._columnTemplates);
    this.allSerachFields = value.filter(f => f.BackEndType === 'System.String');
    if (this.allSerachFields.length > 0) {
      this.currentSerachField = this.allSerachFields[0];
    }
    console.log('this.allSerachFields --->', this.allSerachFields);
  }

  data: any;
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
  allSerachFields: Array<any>;
  currentSerachField: any;

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
    this.filter = {};
    this.loading = true;
    this.count = 0;
    this.pageItemsPerPage = 10;
    this.columnTemplates = new Array<TemplateEntityColumn>();
    this.selectedColumns = new Array<any>();
    this.data = {};
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
    this.allSerachFields = new Array<any>();
    this.currentSerachField = {};

  }
}
@Directive()
export abstract class TreeTableDirective extends TabPageDirective
  implements OnInit, AfterViewInit, OnDestroy {

  @Input() isChildren = false;
  table: TableModel = new TableModel();
  tempSelectedColumns: any[] = [];
  title = '';
  url = '';
  image = '';
  eventTable = null;
  /** Таблица */
  @ViewChild('tt1') treeTable;
  enumDataType = EDataType;
  @ViewChild('dialog', { read: ViewContainerRef })
  dialogContainer: ViewContainerRef;
  controller = '';
  parentId = '';
  searchField = '';

  /**
   * Для поиска
   */
  text: string;
  results: any = [];

  constructor(
    @Inject('IAuthenticationService') authenticationService: IAuthenticationService,
    @Inject('ITabService') @Inject('ITabService') tabService: ITabService,
    protected service: ITreeTableService,
    private cudService: CUDService,
    private cdr: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private translateService: TranslateService
  ) {
    super(authenticationService, tabService);
  }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(s => {
      this.initializeTable();
    });

    // this.initializeTable();
    if (!this.isChildren) {
      super.ngOnInit();
    }
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit    --->   ', this.treeTable);
    this.initializeTable();
  }

  create(): void {
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

  /**
   * олучает первичные ключи таблицы
   * @returns список названий колонок-ключей
   */
  getPrimaryKeys(): string[] {
    return this.table.columnTemplates
      .filter((f) => f.Key)
      .map((m) => m.FieldName);
  }

  ngOnDestroy(): void { }

  initializeTable(): void {
    this.setSessionKey();
    // this.getCount(); ???????????
    this.getTableTemplate();
    // this.getColumnsRules();
  }

  setSessionKey(): void {
    this.table.sessionKey = this.getSessionKey();
  }

  getSessionKey = (): string => 'filter' + this.url.slice(1);

  // getCount(): void {
  //   this.service
  //   .getCount()
  //   .pipe()
  //   .subscribe((count) => (this.table.count = count as number));
  // }

  // tslint:disable-next-line:variable-name
  // _getTableTemplate = async (): Promise<any> => await this.service.getTemplate(true).toPromise();

  // async getTableTemplate(): Promise<any> {
  //   await this._getTableTemplate()
  // }
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
        this.tempSelectedColumns = this.table.columnTemplates;
        this.getDataLazy();
      });
  }


  // getColumnsRules(): void {}

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
   * TODO: рефакторинг!!!(убрать после доработки бэка)
   * Консолидирую бэковские типы и фронтовые
   * @param type тип
   * @returns фронтовый тип
   */
  backFieldType2FrontFieldType(type: string): EDataType {
    if (type.startsWith('Altius.BLL.DTO')) {
      return EDataType.OBJECT;
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

  /**
   * Получает константу по типу (асинхронная)
   * @param type тип
   */
  async getConstant(type: string): Promise<any> {
    return await this.service.getConstant(type).toPromise();
  }

  onNodeExpand($event): void {
    console.log('onNodeExpand EVENT  --->   ', $event.node);
    this.table.loading = true;

    const PKs = this.getPrimaryKeys();
    // console.log('PK --> ', PKs);

    const paging = {
      page: 1,
      pageItems: 10,
    };

    const filter = {};
    filter[`${this.controller}.${this.parentId}`] = { value: $event.node.data[PKs[0]], matchMode: 'contains' };

    const eventNodeExpand = {
      filters: filter,
      sortField: null
    };

    this.service
      .getItems(
        this.table.filter
          ? this.frontFilter2backEasyFilter(eventNodeExpand)
          : [],
        [],
        paging
      ).subscribe((data) => {
        console.log('onNodeExpand EVENT SUB');
        const dtres = [];
        data?.items.forEach(d => {
          dtres.push({ data: d, leaf: d.childCount === 0 });
        });
        $event.node.children = dtres;
        this.table.data = [...this.table.data];
        this.table.loading = false;
        this.cdr.detectChanges();
        console.log('onNodeExpand EVENT GETING');
      });
  }

  rowTrackBy(index: number, el: any): number {
    return el.id;
  }

  search(event): void {
    const query = event.query;
    const filter = {};
    filter[`${this.controller}.${this.table.currentSerachField.FieldName}`] = { value: query, matchMode: 'contains' };

    const paging = {
      page: 1,
      pageItems: 1000,
    };

    this.service
      .getItems(
        this.table.filter
          ? this.frontFilter2backEasyFilter({ filters: filter })
          : [],
        [],
        paging
      ).subscribe(data => {
        if (data.items.length > 0) {
          const requests = data.items.map(m => this.service.treedown(m[this.getPrimaryKeys()[0]]));
          forkJoin(requests).subscribe(res => {
            const tempResult = [];
            res.forEach((paths: []) => {
              tempResult.push(paths.map((m: any) => {
                if (Array.isArray(m.name)) {
                  m.name = m.name.filter(f => f.language === this.translateService.currentLang)[0].name;
                }
                return {
                  label: m.name,
                  id: m[this.getPrimaryKeys()[0]]
                };
              }));
            });
            this.results = [...tempResult];
            this.cdr.detectChanges();
            console.log('SEARCH DATA -->  s', this.results);
          });
        }
      });
  }

  selectSearchItem(event): void {
    this.text = event[event.length - 1];
    // console.log('select', event);
  }

  focusSearchInput(event): void {
    // console.log('focus', event);
    // this.tempSelectedSerach = this.text;
    // this.text = null;
  }

  blueSearchInput(event): void {
    // console.log('blur', event);
    // console.log(this.text);
    // if (!this.text && this.tempSelectedSerach) {
    //   this.text = this.tempSelectedSerach;
    // }
  }

  /**
   * Получает данные по всем выбранным критериям
   * @param [event] событие
   */
  getDataLazy(event?): void {
    // this.initializeTable();
    console.log('getDataLazy');
    this.eventTable = event || this.eventTable;
    this.table.loading = true;
    // console.log('this.this.table.filter --->', this.table.filter);
    // console.log('this.treeTable --->', this.treeTable);
    // this.treeTable.filter('null', 'ParentId', 'equal');
    // this.table.filter.ParentId = {
    //   value: 'null',
    //   matchMode: 'equal'ы
    // };
    console.log('EVENT --->', event);
    const paging = {
      page: (this.eventTable?.first / this.eventTable?.rows || 0) + 1,
      pageItems: this.eventTable?.rows || 10,
    };

    this.table.currentPage = paging.page;
    this.table.filter[`${this.controller}.${this.parentId}`] = { value: 'null', matchMode: 'contains' };
    if (!this.eventTable) {

      this.eventTable = {};

    }
    this.eventTable.filters = this.table.filter;

    this.service
      .getItems(
        this.table.filter
          ? this.frontFilter2backEasyFilter(this.eventTable)
          : [],
        [],
        paging
      )
      .subscribe((data) => {
        const dtres = [];
        data?.items.forEach(d => {
          dtres.push({ data: d, leaf: false });
        });
        this.table.data = dtres;
        // this.table.data = (data?.items || []).map((m) => {
        //   m.selected = this.table.selectAll;
        //   return m;
        // });
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
        console.log('DATA ----->', this.table.data);

        // this.refreshSelectState();
        this.table.loading = false;
        this.cdr.detectChanges();
      });
  }

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

  getConstantLabelByTypeAndValue(type: string, value: string): string {
    return this.table.constants.filter(f => f.ConstantType === type && f.Value === value)[0]?.Label || 'Не определено';
  }

  toggleModalChangeColumns(state: boolean): void {
    this.tempSelectedColumns = this.table.selectedColumns;
    this.table.displayChangeCoumns = state;
  }

  changeSelectedColumns(): void {
    this.table.selectedColumns = this.tempSelectedColumns;
  }
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
