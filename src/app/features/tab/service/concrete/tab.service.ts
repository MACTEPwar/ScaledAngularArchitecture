import { Injectable, Inject, Optional } from '@angular/core';
import { ITabService } from '../intefaces/i-tab.service';
import { ITab } from '../../types/interface/i-tab';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class TabService implements ITabService {

  tabList$: BehaviorSubject<Array<ITab>>;
  keys: Array<string>;

  constructor(
    @Inject('uniq') @Optional() public uniq?: Array<string>
  ) {
    this.keys = uniq;
    this.tabList$ = new BehaviorSubject<Array<ITab>>(new Array<ITab>());
  }

  /**
   * Дорбавляет новую вкладку
   * @param tab вкладка
   * @param [index] индекс (если нет, то последней)
   * @returns true если добавил 
   */
  pushTab(tab: ITab, index?: number): boolean {
    index = index || this.tabList$.getValue().length;
    this.tabList$.next(this.tabList$.getValue().splice(index, 0, tab));
    return true;
  }

  dropTab(tab: ITab): boolean;
  dropTab(index: number): boolean;
  dropTab(value: ITab | number): boolean {
    let index = 0;
    const oldValue = this.tabList$.getValue();
    if (typeof value === 'number') {
      // if number
      index = value > -1 ? value as number : 0;
    } else {
      // if ITab
      const tab = value as ITab;
      // дописать
      const finder = (element: ITab, index: number, array: Array<ITab>): boolean => {
        if (index === 3) {
          return true;
        } 
      }

      index = oldValue.findIndex(finder);
      // index = oldValue.findIndex((n: ITab) => tab.url === n.url);
    }
    this.tabList$.next(oldValue.splice(index, 1));
    return true;
  }

  findTab(tab: ITab): ITab {
    throw new Error("Method not implemented.");
  }

  activateTab(tab: ITab): void {
    throw new Error("Method not implemented.");
  }

  disactivateAllTabs(): void {
    throw new Error("Method not implemented.");
  }

  // private finder(element, index, array): number {

  // }
}
