import { ITab } from "../../types/interface/i-tab";

export interface ITabService {
    pushTab(tab: ITab, index?: number): boolean;
    dropTab(tab: ITab): boolean;
    dropTab(index: number): boolean;
    findTab(tab: ITab): ITab;
    activateTab(tab: ITab): void;
    disactivateAllTabs(): void;
}