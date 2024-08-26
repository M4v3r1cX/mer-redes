import { Component, AfterViewInit } from '@angular/core';
import panzoom from "panzoom";
import { ActivatedRoute } from '@angular/router';
import { MapasService } from '../services/mapas.service';
import { OAMapaDTO } from '../models/OAMapaDTO';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements AfterViewInit {

  loginLevantado = false;
  sidenavwidth: number = 0;
  sidebarAbierto = false;
  idRed: string | null = "";
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
  actividadSeleccionada: any;
  mostrandoDetalleActividad: boolean = false;
  numeroActividadesEnRuta: number = 0;
  actividadesEnRuta: any[] = [];
  sideBarRutasAbierto: boolean = false;
  sideBarRutasWidth: number = 0;

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

    let rutaGuardada = localStorage.getItem('ruta');
    if (rutaGuardada != null) {
      this.actividadesEnRuta = JSON.parse(rutaGuardada);
      this.numeroActividadesEnRuta = this.actividadesEnRuta.length;
    }
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

  clickActividades(idx: number) {
    this.actividadSeleccionada = this.actividades[idx];
    this.mostrandoDetalleActividad = true;
  }

  clickActividadesOjo(idx: number) {
    this.actividadSeleccionada = this.actividadesEnRuta[idx];
    this.mostrandoDetalleActividad = true;
  }

  cerrarDetalleActividad() {
    this.mostrandoDetalleActividad = false;
  }

  seleccionarActividad(idx: number, seleccionado: boolean) {
    if (seleccionado) {
      this.actividades[idx].seleccionado = true;
      this.actividadesEnRuta.push(this.actividades[idx]);
      this.numeroActividadesEnRuta++;
    } else {
      this.actividades[idx].seleccionado = false;
      this.actividadesEnRuta.splice(idx, 1);
      this.numeroActividadesEnRuta--;
    }
    this.saveRutaEnLocalStorage();
  }

  mostrarRutas() {
    if (this.sideBarRutasAbierto) {
      this.sideBarRutasAbierto = false;
    } else {
      this.sideBarRutasAbierto = true;
    }
  }

  eliminarActividadEnRuta(idx: number) {
    let act = this.actividadesEnRuta[idx];
    let idxAct = this.actividades.findIndex((a) => a.id == act.id);
    console.log(idxAct);
    if (idxAct != -1) {
      this.actividades[idxAct].seleccionado = false;
    }
    this.actividadesEnRuta.splice(idx, 1);
    this.numeroActividadesEnRuta--;
    if (this.numeroActividadesEnRuta == 0) {
      localStorage.removeItem('ruta');
    } else {
      this.saveRutaEnLocalStorage();
    }
  }

  cerrarSidebars() {
    this.sideBarActividadesAbierto = false;
    this.sideBarActividadesWidth = 0;
    this.sideBarHijosAbierto = false;
    this.sideBarHijosWidth = 0;
  }

  ordenar(idx: number, direccion: string) {
    let temp = this.actividadesEnRuta[idx];
    if (direccion == 'up') {
      if (idx - 1 > -1) {
        this.actividadesEnRuta[idx] = this.actividadesEnRuta[idx - 1];
        this.actividadesEnRuta[idx - 1] = temp;
      }
    } else {
      if (idx + 1 < this.actividadesEnRuta.length) {
        this.actividadesEnRuta[idx] = this.actividadesEnRuta[idx + 1];
        this.actividadesEnRuta[idx + 1] = temp;
      }
    }
    this.saveRutaEnLocalStorage();
  }

  saveRutaEnLocalStorage() {
    localStorage.setItem('ruta', JSON.stringify(this.actividadesEnRuta));
  }

  saveRuta() {
    let ruta = {
      nombre: 'Ruta de ' + this.actividadesEnRuta[0].nombre,
      actividades: this.actividadesEnRuta
    }
    /*this.mapaService.saveRuta(ruta).subscribe((data:any) => {
      console.log(data);
    });*/
  }

  exportarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
		doc.text('Mis Rutas', 10, 10);
		const headers = [['Ruta', 'Descripción', 'Ubicación en Libro']];
		let data: any[] = [];

    let rutas = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while ( i-- ) {
      rutas.push(localStorage.getItem(keys[i]));
    }
  
    for (let r of rutas) {
      let ruta = JSON.parse(r??"");
      for (let a of ruta) {
        let row = [a.ruta, a.descripcionActividad, a.ubicacionEnLibro];
        data.push(row);
      }
    }

		autoTable(doc, {
			head: headers,
			body: data,
			startY: 20,
		});
		doc.save('rutas.pdf');
  }
}
