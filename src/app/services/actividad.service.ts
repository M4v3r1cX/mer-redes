import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ActividadMerDTO } from "../models/ActividadMerDTO";

@Injectable({
    providedIn: "root",
  })

  export class ActividadService {
    REST_URL = environment.apiMerBackend;

    constructor(private http: HttpClient){}

    save(actividad: ActividadMerDTO) {
        return this.http.post(this.REST_URL + "actividadmer/save", actividad);
    }

    getActividades() {
      return this.http.get(this.REST_URL + "actividadmer/getAllActividades");
    }

    deleteActividad(id: number) {
      return this.http.get(this.REST_URL + "actividadmer/deleteActividad?id=" + id);
    }

    getLibros() {
      return this.http.get(this.REST_URL + "actividadmer/getLibros");
    }

    getActividad(id: string) {
      return this.http.get(this.REST_URL + "actividadmer/getActividad?id=" + id);
    }
  }