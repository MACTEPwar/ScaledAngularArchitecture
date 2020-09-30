import { Component, OnInit } from '@angular/core';
import { Constant, TemplateEntityColumn, TemplateEntity, EDataType } from '../../models/template-entity';
import { DeviceLinkService } from './device-link.service';
import { Stirng2FaIcon as s2fi } from '@shared/helpers/string-2-faicon';
import { TranslateService } from '@ngx-translate/core';

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

export class TableModel {
  loading: boolean;
  count: number;
  pageItemsPerPage: number;
  columnTemplates: Array<TemplateEntityColumn>;
  data: any[];
  filterRules: any[];
  rowsPerPageOptions: number[];
  currentPage: number;
  displayChangeCoumns: boolean;
  constants: Array<Constant>;

  constructor() {
    this.loading = true;
    this.count = 0;
    this.pageItemsPerPage = 10;
    this.columnTemplates = new Array<TemplateEntityColumn>();
    this.data = new Array<any>();
    this.filterRules = new Array<any>();
    this.rowsPerPageOptions = [5, 10, 20, 50, 100];
    this.currentPage = 1;
    this.displayChangeCoumns = false;
    this.constants = new Array<Constant>();
  }
}


@Component({
  selector: 'al-device-link',
  templateUrl: './device-link.component.html',
  styleUrls: ['./device-link.component.scss'],
  providers: [DeviceLinkService]
})
export class DeviceLinkComponent implements OnInit {

  /** Настройки таблицы для отображения */
  table: TableModel = new TableModel();
  /** Сохраненное состояние объекта таблицы */
  eventTable = null;
  /** Проброс перечисления для html */
  enumDataType = EDataType;
  stirng2faIcon: any = s2fi;

  filterId = '';

  constructor(private service: DeviceLinkService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  initializeTable(): void {
    this.getCount();
    this.getTableTemplate();
    this.getColumnsRules();
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
        // this.table.selectedColumns = this.table.columnTemplates;
        // this.tempSelectedClumns = this.table.columnTemplates;
        // console.log(this.table.columnTemplates);
        // console.log('SUPER TABLE --->', this.table);
      });
  }

  /**
   * Получает данные по всем выбранным критериям
   * @param [event] событие
   */
  getDataLazy(event?): void {
    // console.log('test getDataLazy');
    this.eventTable = event || this.eventTable;
    this.eventTable.filters['Device.CashboxId'] = { value: this.filterId, matchMode: 'contains' };
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
          // m.selected = this.table.selectAll;
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
        // this.refreshSelectState();
        this.table.loading = false;
      });
  }

  /**
   * Получает константу по типу (асинхронная)
   * @param type тип
   */
  async getConstant(type: string): Promise<any> {
    return await this.service.getConstant(type).toPromise();
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
}

