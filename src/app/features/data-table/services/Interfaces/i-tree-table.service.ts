import { Observable } from 'rxjs';
import { FilterValue } from '../../models/filter-value';

export interface ITreeTableService {
    treeup(parentId?: number): Observable<any>;
    treedown(id: number): Observable<any>;
    getController(): string;
    getAllItems(): Observable<any>;
    getCount(): Observable<any>;
    getFilter(): Observable<any>;
    getItems(filter: any[], values: FilterValue[], paging): Observable<any>;
    getTemplate(short: boolean): Observable<any>;
    getItem(id: string): Observable<any>;
    putItem(item: any): Observable<any>;
    deleteItem(id: string): Observable<any>;
    getConstant(type: string): Observable<any>;
}
