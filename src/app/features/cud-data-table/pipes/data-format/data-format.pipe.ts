import { Pipe, PipeTransform } from '@angular/core';
import {LanguageModel } from '../../models/languagemodel';

@Pipe({
  name: 'dataFormat'
})
export class DataFormatPipe implements PipeTransform {

  transform(value: any): string {
    // console.log(value);
    if (value === null) {
      return value;
    } else if (Array.isArray(value)){
      // TODO: сделать локализацию
      return (value.filter(f => f.language === 'ru') as LanguageModel[])[0].name;
    } else if (value?.toString().search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{6})?/g) !== -1) {
      return new Date(value).toLocaleString();
    } else {
      return value;
    }
  }

}
