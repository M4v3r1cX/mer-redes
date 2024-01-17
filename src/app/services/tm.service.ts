import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { TMDto } from "../models/TMDto";

@Injectable({
    providedIn: "root",
})

export class TmService {
    REST_URL = environment.apiMerBackend;

    constructor(private http: HttpClient){}

    save(oa: TMDto) {
        return this.http.post(this.REST_URL + "tm/save", oa);
      }
  
    getTms() {
        return this.http.get(this.REST_URL + "tm/getAllTms");
    }

    getTm(id: string) {
        return this.http.get(this.REST_URL + "tm/getTm?id=" + id);
    }
  
    deleteTm(id: number) {
        return this.http.get(this.REST_URL + "tm/deleteTm?id=" + id);
    }

    getOaTm() {
        return this.http.get(this.REST_URL + "tm/getAllOaTms");
    }
    
}