import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

export class BaseService {
  protected baseURL = environment.apiUrl;

  constructor(protected http: HttpClient) {}
}
