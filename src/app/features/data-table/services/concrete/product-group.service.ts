import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeTableService } from './tree-table.service';

@Injectable()
export class ProductGroupService extends TreeTableService {
    constructor(http: HttpClient) {
        super(http);
        this.controller = 'productGroup';
    }
}
