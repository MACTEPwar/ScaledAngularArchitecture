import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITreeTableService } from '../Interfaces/i-tree-table.service';
import { TableService } from './table.service';

export class TreeTableService extends TableService implements ITreeTableService {
    protected controller = '';

    constructor(protected http: HttpClient) {
        super(http);
    }

    treeup(parentId?: number): Observable<any> {
        return this.http.get(this.baseURL + `/api/catalogs/${this.controller}/treeup/${parentId || ''}`);
    }
    treedown(id: number): Observable<any> {
        return this.http.get(this.baseURL + `/api/catalogs/${this.controller}/treedown/${id}`);
    }
}
