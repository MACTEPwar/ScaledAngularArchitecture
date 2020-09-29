import { Injectable, Inject, Optional } from '@angular/core';
import { ITabService } from '../intefaces/i-tab.service';
import { ITab } from '../../types/interface/i-tab';

@Injectable()
export class TabService implements ITabService {

  /**
   * Список табов
   */
  tabList: Array<ITab>;

  /**
   * Список ключевых полей
   */
  private keys: Array<string>;

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

  /**
   * Удаляет таб по индексу или табу (ключу)
   * @param value значение
   * @returns true если удали
   */
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
        // TODO: реализовать, если нужно, несколько ключей
        const finderValue: string = (value as ITab).url;
        if (element.url === finderValue) {
          return true;
        }
      };
      index = oldValue.findIndex(finder);
    }
    this.tabList = oldValue.splice(index, 1);
    return true;
  }

  /**
   * Ищет таб
   * @param url ключ
   * @returns Таб
   */
  findTab(url: string): ITab {
    const finder = (element: ITab, ind: number, array: Array<ITab>): boolean => {
      // TODO: реализовать, если нужно, несколько ключей
      const finderValue: string = url;
      if (element.url === finderValue) {
        return true;
      }
    };
    return this.tabList.find(finder);
  }

  /**
   * Делает таб активным
   * @param tab Таб
   */
  activateTab(tab: ITab): void {
    this.tabList.forEach((element) => {
      element.active = element.url === tab.url;
    });
  }

  /**
   * Делает НЕ активными все табы
   */
  disactivateAllTabs(): void {
    this.tabList.forEach((element) => {
      element.active = false;
    });
  }
}
