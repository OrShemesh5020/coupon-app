import { Config } from './../models/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
export class ConfigService {
  constructor(private http: HttpClient) {}
  configUrl = 'http://localhost:8080/general/login';

  getConfig() {
    return this.http.get(this.configUrl);
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }
}
