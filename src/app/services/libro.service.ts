import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { EntidadGenericaRequest } from "../models/EntidadGenericaRequest";

@Injectable({
  providedIn: "root",
})
export class LibroService {
    REST_URL = environment.apiMerBackend;

    constructor(private http: HttpClient){}

    save(libro: EntidadGenericaRequest) {
        return this.http.post(this.REST_URL + "libro/save", libro);
    }

    getLibros() {
      return this.http.get(this.REST_URL + "libro/getAllLibros");
    }

    deleteLibro(id: number) {
      return this.http.get(this.REST_URL + "libro/deleteLibro?id=" + id);
    }
}