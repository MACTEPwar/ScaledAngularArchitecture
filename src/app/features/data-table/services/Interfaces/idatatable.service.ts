import { FilterValue } from '../../models/filter-value';
import { Observable } from 'rxjs';

export interface IdatatableService {
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
