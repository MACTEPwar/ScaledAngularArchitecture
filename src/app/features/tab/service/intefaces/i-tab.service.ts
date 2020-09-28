import { ITab } from '../../types/interface/i-tab';

export interface ITabService {
    tabList: Array<ITab>;
    pushTab(tab: ITab, index?: number): boolean;
    dropTab(value: ITab | number): boolean;
    findTab(tab: ITab): ITab;
    activateTab(tab: ITab): void;
    disactivateAllTabs(): void;
}
