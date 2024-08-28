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

  getOasHijos(id?: number) {
    return this.http.get(this.REST_URL + "mapas/getOasHijosByOa?id=" + id);
  }

  getTareasMatematicasByIdHijo(id?: number) {
    return this.http.get(this.REST_URL + "mapas/getTareasMatematicasByOaHijo?id=" + id);
  }

  getActividadesByIdTareaMatematica(id?: number) {
    return this.http.get(this.REST_URL + "mapas/getActividadesByTareaMatematica?id=" + id);
  }

  saveRuta(ruta: any) {
    return this.http.post(this.REST_URL + "ruta/saveRuta", ruta);
  }

  getRutasUsuario() {
    return this.http.get(this.REST_URL + "ruta/getRutasUsuario");
  }
}
