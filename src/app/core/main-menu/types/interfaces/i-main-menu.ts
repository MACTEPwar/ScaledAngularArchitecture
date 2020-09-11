export interface IMainMenu {
    id: number;
    name: string;
    url: string;
    image: string;
    level: number;
    parentId?: number;
    children?: IMainMenu[];
}
