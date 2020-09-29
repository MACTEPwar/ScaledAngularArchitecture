import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePickerSettingsWithLocale'
})
export class DatePickerSettingsWithLocalePipe implements PipeTransform {

  transform(value: string): any {
    return null;
  }

}
