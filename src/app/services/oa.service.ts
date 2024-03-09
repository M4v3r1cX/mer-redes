import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { OaDTO } from "../models/OaDTO";

@Injectable({
    providedIn: "root",
  })

  export class OaService {
    REST_URL = environment.apiMerBackend;

    constructor(private http: HttpClient){}

    save(oa: OaDTO) {
      return this.http.post(this.REST_URL + "oa/save", oa);
    }

    getOas() {
      return this.http.get(this.REST_URL + "oa/getAllOas");
    }

    deleteOa(id: number) {
      return this.http.get(this.REST_URL + "oa/deleteOa?id=" + id);
    }

    getRedes() {
      return this.http.get(this.REST_URL + "oa/getRedes");
    }

    getOa(id: string) {
      return this.http.get(this.REST_URL + "oa/getOa?id=" + id);
    }

    getHijosOa(id: string) {
      return this.http.get(this.REST_URL + "oa/getHijos?id=" + id);
    }

    
  }