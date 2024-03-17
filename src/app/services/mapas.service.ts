import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  REST_URL = environment.apiMerBackend;

  constructor(private http: HttpClient) { }

  getOasByRed(red?: string) {
    return this.http.get(this.REST_URL + "mapas/getOasByRed?id=" + red);
  }

  getOasHijosByRed(red?: string) {
    return this.http.get(this.REST_URL + "mapas/getOasHijosByRed?id=" + red);
  }
}
