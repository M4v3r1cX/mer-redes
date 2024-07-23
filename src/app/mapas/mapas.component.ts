import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import panzoom from "panzoom";
import { ActivatedRoute } from '@angular/router';
import { MapasService } from '../services/mapas.service';
import { OAMapaDTO } from '../models/OAMapaDTO';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements AfterViewInit {

  loginLevantado = false;
  sidenavwidth: number = 0;
  sidebarAbierto = false;
  idRed: string | null ="";
  oasMapa: OAMapaDTO[] = [];
  showLoading: boolean = true;
  nombreSeccionActiva: string = "";
  backgroundMapa: string = "";
  x: string = "100";
  y: string = "100";
  xMapa: string[] = [];
  yMapa: string[] = [];
  sideBarContentLoading: boolean = false;
  sideBarHijosWidth: number = 0;
  sideBarHijosAbierto: boolean = false;
  sideBarActividades: boolean = false;
  hijosOaSeleccionado: any[]= [];
  sideBarActividadesWidth: number = 0;
  sideBarActividadesAbierto: boolean = false;
  actividades: any[] = [];

  constructor(private route: ActivatedRoute, public mapaService: MapasService) {

  }

  ngOnInit() {
    console.log('ngOnInit');
    this.idRed = this.route.snapshot.paramMap.get('id');
    switch (this.idRed) {
      case '1':
        this.nombreSeccionActiva = 'Números';
        this.backgroundMapa = "assets/mapas/oa/numeros.svg";
        break;
      case '2':
        this.nombreSeccionActiva = 'Campo Aditivo';
        this.backgroundMapa = "assets/mapas/oa/campo_aditivo.svg";
        break;
      case '3':
        this.nombreSeccionActiva = 'Campo Multiplicativo';
        this.backgroundMapa = "assets/mapas/oa/campo_multiplicativo.svg"; // probar esto y que salga la wea en la posición que le dimos en la otra app
        break;
      case '4':
        this.nombreSeccionActiva = 'Patrones y Álgebra';
        this.backgroundMapa = "assets/mapas/oa/algebra.svg";
        break;
      case '5':
        this.nombreSeccionActiva = 'Medición';
        this.backgroundMapa = "assets/mapas/oa/medicion.svg";
        break;
      case '6':
        this.nombreSeccionActiva = 'Geometría';
        this.backgroundMapa = "assets/mapas/oa/geometria.svg";
        break;
      case '7':
        this.nombreSeccionActiva = 'Datos y Probabilidades';
        this.backgroundMapa = "assets/mapas/oa/probabilidades.svg";
        break;
    }
    if (this.idRed != null) {
      this.mapaService.getOasHijosByRed(this.idRed).subscribe((data:any)=>{
        this.agregarCuadros(data);
      });
    }
    //this.nombreSeccionActiva = this.id + '';
  }

  ngAfterViewInit() {
    panzoom(document.querySelector('#zonamapa')!,
    {
      smoothScroll: false,
      initialX: 0,
      initialY: 0,
      initialZoom: 0.24
    });
  }

  openNav() {
    if (!this.sidebarAbierto) {
      this.sidenavwidth = 400;
      this.sidebarAbierto = true;
    } else {
      this.sidenavwidth = 0;
      this.sidebarAbierto = false;
    }
    
  }

  agregarCuadros(data: any) {
    console.log(data);
    for (let d of data) {
      let oa: OAMapaDTO = new OAMapaDTO();
      let desc:string = d.descripcion;
      oa.descripcion = desc;
      oa.id = d.id;
      oa.nombre = d.codigo;
      oa.x = d.x;
      oa.y = d .y;
      oa.tienePosicionamiento = d.tienePosicionamiento;
      this.xMapa.push(oa.x);
      this.yMapa.push(oa.y);
      this.oasMapa.push(oa);
    }
    this.showLoading = false;
  }

  cargarHijos(pos: number) {
    this.sideBarHijosAbierto = true;
    this.sideBarHijosWidth = 400;
    this.sideBarContentLoading = true;    
    this.mapaService.getTareasMatematicasByIdHijo(this.oasMapa[pos].id).subscribe((data:any)=>{
      this.hijosOaSeleccionado = data;
      this.sideBarContentLoading = false;
    });
  }

  cerrarSidebarHijjos() {
    this.hijosOaSeleccionado = [];
    this.sideBarHijosWidth = 0;
    this.sideBarHijosAbierto = false;
    this.sideBarActividadesAbierto = false;
    this.sideBarActividadesWidth = 0;
  }

  mostrarActividades(id: number) {
    this.sideBarActividadesAbierto = true;
    this.sideBarActividadesWidth = 400;
    this.actividades = [];
    //this.sideBarContentLoading = true;
    this.mapaService.getActividadesByIdTareaMatematica(id).subscribe((data:any) => {
      this.actividades = data;
      //this.sideBarContentLoading = false;
    });
  }

  cerrarSidebarActividades() {
    this.actividades = [];
    this.sideBarActividadesWidth = 0;
    this.sideBarActividadesAbierto = false;
  }
}
