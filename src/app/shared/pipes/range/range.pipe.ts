import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
/** Создает фейковый массив */
export class RangePipe implements PipeTransform {

  transform(value: number): number[] {
    const items: number[] = [];
     for (let i = 1; i <= value; i++) {
       items.push(i);
     }
     return items;
  }
}
