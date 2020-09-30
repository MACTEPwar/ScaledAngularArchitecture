import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterValue } from '../../models/filter-value';
import { environment } from '../../../../../environments/environment';
import { CustomHttpParamEncoder } from '@shared/helpers/custom-http-encoder';

@Injectable()
export class DeviceLinkService {
    controller = 'device';
    protected baseURL = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getCount(): Observable<any> {
        return this.http.get(
            this.baseURL + `/api/catalogs/${this.controller}/count`
        );
    }

    getItems(filters: any[], values: FilterValue[], paging): Observable<any> {
        let params = new HttpParams();
        const pageItems = paging.pageItems;
        const page = paging.page;
        if (filters && filters.length > 0) {
            filters.forEach((filter, ind) => {
                params = params.set(
                    `filter.values[${ind}].nameModel`,
                    filter.namemodel
                );
                params = params.set(
                    `filter.values[${ind}].nameField`,
                    filter.namefield
                );
                if (filter.value) {
                    params = params.set(`filter.values[${ind}].value`, filter.value);
                }
                if (filter.order) {
                    params = params.set(`filter.values[${ind}].order`, filter.order);
                }
            });
        }
        if (pageItems) {
            params = params.set('filter.paging.pageItems', pageItems.toString());
        }
        if (page) {
            params = params.set('filter.paging.page', page.toString());
        }
        return this.http.get(
            this.baseURL + `/api/catalogs/${this.controller}/filter`,
            { params }
        );
    }

    getTemplate(short: boolean = false): Observable<any> {
        return this.http.get(
            this.baseURL +
            `/api/catalogs/${this.controller}/header?shortHead=${short}`
        );
    }

    getConstant(type: string): Observable<any> {

        const customHttpParamEncoder = new CustomHttpParamEncoder();

        const encodeUrl: HttpParams = new HttpParams({ encoder: customHttpParamEncoder }).append('typeName', type);

        return this.http.get(
            this.baseURL + `/api/enum/enum`, { params: encodeUrl }
        );
    }

    getFilter(): Observable<any> {
        return this.http.get(
            this.baseURL + `/api/catalogs/${this.controller}/getfilter`
        );
    }
}
