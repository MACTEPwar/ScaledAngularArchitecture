import { BehaviorSubject } from 'rxjs';
import { ITab } from '../../types/interface/i-tab';

export interface ITabService {
    /**
     * Список табов
     */
    tabList: BehaviorSubject<Array<ITab>>;
    /**
     * Дорбавляет новую вкладку
     * @param tab вкладка
     * @param [index] индекс (если нет, то последней)
     * @returns true если добавил
     */
    pushTab(tab: ITab, index?: number): boolean;
    /**
     * Удаляет таб по индексу или табу (ключу)
     * @param value значение
     * @returns true если удали
     */
    dropTab(value: ITab | number): boolean;
    /**
     * Ищет таб
     * @param tab Таб
     * @returns Таб
     */
    findTab(url: string): ITab;
    /**
     * Делает таб активным
     * @param tab Таб
     */
    activateTab(tab: ITab): void;
    /**
     * Делает НЕ активными все табы
     */
    disactivateAllTabs(): void;
}
