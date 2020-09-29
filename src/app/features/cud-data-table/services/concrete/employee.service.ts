import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TableService } from '../../../data-table/services/concrete/table.service';

@Injectable()
export class EmployeeService extends TableService {

  constructor(http: HttpClient) {
    super(http);
    this.controller = 'employee';
  }

}
