import { IMainMenu } from '../interfaces/i-main-menu';

export class MainMenu implements IMainMenu {
    id: number;
    name: string;
    url: string;
    image: string;
    level: number;
    parentId?: number;
    children?: MainMenu[];
}
