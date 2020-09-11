import { Observable } from 'rxjs';
import { IMainMenu } from '../types/interfaces/i-main-menu';

export interface IMainMenuService {
    getMenu(): Observable<IMainMenu[]>;
}
