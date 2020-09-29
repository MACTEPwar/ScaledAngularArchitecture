import { Injectable, Inject, Optional } from '@angular/core';
import { ITabService } from '../intefaces/i-tab.service';
import { ITab } from '../../types/interface/i-tab';

@Injectable()
export class TabService implements ITabService {

  tabList: Array<ITab>;
  keys: Array<string>;

  constructor(
    @Inject('uniq') @Optional() public uniq?: Array<string>
  ) {
    this.keys = uniq || new Array<string>('url');
    this.tabList = new Array<ITab>();
  }

  /**
   * Дорбавляет новую вкладку
   * @param tab вкладка
   * @param [index] индекс (если нет, то последней)
   * @returns true если добавил
   */
  pushTab(tab: ITab, index?: number): boolean {
    index = index || this.tabList.length;
    this.tabList = this.tabList.splice(index, 0, tab);
    return true;
  }

  dropTab(value: ITab | number): boolean {
    let index = 0;
    const oldValue = this.tabList;
    if (typeof value === 'number') {
      // if number
      index = value > -1 ? value as number : 0;
    } else {
      // if ITab
      const tab = value as ITab;
      const finder = (element: ITab, ind: number, array: Array<ITab>): boolean => {
        // TODO: реализовать если нужно несколько ключей
        const finderValue: string = (value as ITab).url;
        if (element.url === finderValue) {
          return true;
        }
      };

      index = oldValue.findIndex(finder);
      // index = oldValue.findIndex((n: ITab) => tab.url === n.url);
    }
    this.tabList = oldValue.splice(index, 1);
    return true;
  }

  findTab(tab: ITab): ITab {
    const finder = (element: ITab, ind: number, array: Array<ITab>): boolean => {
      // TODO: реализовать если нужно несколько ключей
      const finderValue: string = tab.url;
      if (element.url === finderValue) {
        return true;
      }
    };
    return this.tabList.find(finder);
  }

  activateTab(tab: ITab): void {
    this.tabList.forEach((element) => {
      element.active = element.url === tab.url;
    });

  }

  disactivateAllTabs(): void {
    this.tabList.forEach((element) => {
      element.active = false;
    });
  }
}
