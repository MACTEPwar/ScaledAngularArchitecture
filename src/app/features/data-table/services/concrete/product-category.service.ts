import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeTableService } from './tree-table.service';

@Injectable()
export class ProductCategoryService extends TreeTableService {
    constructor(http: HttpClient) {
        super(http);
        this.controller = 'productCategory';
    }
}
