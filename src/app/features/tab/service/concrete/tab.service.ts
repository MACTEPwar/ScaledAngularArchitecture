import { Injectable, Inject, Optional } from '@angular/core';
import { ITabService } from '../intefaces/i-tab.service';
import { ITab } from '../../types/interface/i-tab';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabService implements ITabService {

  /**
   * Список табов
   */
  tabList: BehaviorSubject<Array<ITab>>;

  /**
   * Список ключевых полей
   */
  private keys: Array<string>;

  constructor(
    @Inject('uniq') @Optional() public uniq?: Array<string>
  ) {
    this.keys = uniq || new Array<string>('url');
    this.tabList = new BehaviorSubject<Array<ITab>>(new Array<ITab>());
  }

  /**
   * Дорбавляет новую вкладку
   * @param tab вкладка
   * @param [index] индекс (если нет, то последней)
   * @returns true если добавил
   */
  pushTab(tab: ITab, index?: number): boolean {
    index = index || this.tabList.getValue().length;
    const temp = this.tabList.getValue();
    temp.splice(index, 0, tab);
    this.tabList.next(temp);
    return true;
  }

  /**
   * Удаляет таб по индексу или табу (ключу)
   * @param value значение
   * @returns true если удали
   */
  dropTab(value: ITab | number): boolean {
    let index = 0;
    const oldValue = this.tabList.getValue();
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
    oldValue.splice(index, 1);
    this.tabList.next(oldValue);
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
    return this.tabList.getValue().find(finder);
  }

  /**
   * Делает таб активным
   * @param tab Таб
   */
  activateTab(tab: ITab): void {
    this.tabList.getValue().forEach((element) => {
      element.active = element.url === tab.url;
    });
  }

  /**
   * Делает НЕ активными все табы
   */
  disactivateAllTabs(): void {
    this.tabList.getValue().forEach((element) => {
      element.active = false;
    });
  }
}
