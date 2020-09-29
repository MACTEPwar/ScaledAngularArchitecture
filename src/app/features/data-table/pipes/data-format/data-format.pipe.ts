import { Pipe, PipeTransform } from '@angular/core';
import {LanguageModel } from '../../models/language-model';
import { TemplateEntityColumn, EDataType } from '../../models/template-entity';

@Pipe({
  name: 'dataFormat'
})
export class DataFormatPipe implements PipeTransform {

  transform(val: any, field: TemplateEntityColumn, currentLocale: string, constants = null): string {
    let value = null;
    if (field.Type === EDataType.OBJECT && val[field.FieldName]) {
      value = val[field.FieldName][field.ColumnSetings.DataField];
    } else if (field.Type === EDataType.CONSTANT) {
    } else {
      value = val[field.FieldName];
    }
    if (value === null) {
      return value;
    } else if (Array.isArray(value)){
      // TODO: сделать локализацию
      return (value.filter(f => f.language === currentLocale) as LanguageModel[])[0].name;
    } else if (value?.toString().search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{6})?/g) !== -1) {
      return new Date(value).toLocaleString();
    } else {
      return value;
    }
  }

}
