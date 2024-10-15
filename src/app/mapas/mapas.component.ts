import { Component, AfterViewInit } from '@angular/core';
import panzoom from "panzoom";
import { ActivatedRoute, Router } from '@angular/router';
import { MapasService } from '../services/mapas.service';
import { ActividadService } from '../services/actividad.service';
import { OAMapaDTO } from '../models/OAMapaDTO';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UsersService } from '../services/users.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements AfterViewInit {

  elPanzoom: any;
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
  idRutaActiva: number = -1;
  mostrarMenuUsuario: boolean = false;
  rutasDesdeBd: any[] = [];
  initialX: number = 0;
  initialY: number = 0;
  initialZoom: number = 0.2;

  constructor(
    private route: ActivatedRoute, 
    public mapaService: MapasService, 
    public dialog: MatDialog, 
    public usersService: UsersService,
    public actividadService: ActividadService,
    private router: Router) {

  }

  levantarLogin() {
    if (!this.loginLevantado) {
      this.loginLevantado = true;
      const dialogRef = this.dialog.open(LoginComponent, {
        height: '300px',
        width: '700px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.usersService.isLoggedIn()) {
          this.actividadesEnRuta = [];
          localStorage.removeItem('ruta');
        }
        this.loginLevantado = false;
        this.dialog.closeAll();
      });
    }
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
    let idRutaActiva = localStorage.getItem('idRutaActiva');
    if (idRutaActiva != null) {
      this.idRutaActiva = parseInt(idRutaActiva);
    }

    this.initialX = this.route.snapshot.paramMap.get('x') != null ? parseFloat(this.route.snapshot.paramMap.get('x')!) : 0;
    this.initialY = this.route.snapshot.paramMap.get('y') != null ? parseFloat(this.route.snapshot.paramMap.get('y')!) : 0;
    if (this.initialX != 0 || this.initialY != 0) {
      this.initialX = (this.initialX * -1) + 900;
      this.initialY = (this.initialY * -1) + 200;
      this.initialZoom = 0.5;
    }
  }

  ngAfterViewInit() {
    this.elPanzoom = panzoom(document.querySelector('#zonamapa')!,
    {
      smoothScroll: false,
      initialX: this.initialX,
      initialY: this.initialY,
      initialZoom: this.initialZoom,
      minZoom: 0.2,
      maxZoom: 2,
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
    if (data != null && data.length > 0) {
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
    this.actividadService.getActividad(this.actividadesEnRuta[idx].id).subscribe((data:any) => {
      this.actividadSeleccionada = data;
      this.mostrandoDetalleActividad = true;
    });
  }

  cerrarDetalleActividad() {
    this.mostrandoDetalleActividad = false;
  }

  seleccionarActividad(idx: number, seleccionado: boolean) {
    if (seleccionado) {
      this.actividades[idx].seleccionado = true;
      let act = this.actividades[idx];
      let dto = {
        id: act.id,
        ruta: act.ruta,
        descripcionActividad: act.descripcionActividad,
        ubicacionEnLibro: act.ubicacionEnLibro
      }
      this.actividadesEnRuta.push(dto);
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
    let rutaEnJson = localStorage.getItem('ruta');
    if (rutaEnJson == null || rutaEnJson == "" || rutaEnJson == '[]') {
      Swal.fire({ 
        title: 'Información',
        text: 'No ha agregado actividades a la ruta!',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    } else {
      const datepipe: DatePipe = new DatePipe('en-US')
      let formattedDate = datepipe.transform(new Date(), 'dd-MMM-YYYY HH:mm:ss')
      let ruta = {
        id: localStorage.getItem('idRutaActiva'),
        nombre: formattedDate,
        jsonRuta:  localStorage.getItem('ruta')
      }
      this.mapaService.saveRuta(ruta).subscribe((data:any) => {
        console.log(data);
        this.idRutaActiva = data.comentario;
        localStorage.setItem('idRutaActiva', this.idRutaActiva.toString());
        this.mostrarMenuUsuario = false;
        Swal.fire({ 
          title: 'Información',
          text: 'Ruta guardada con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      });
    }
  }

  loadRuta() {
    this.mapaService.getRutasUsuario().subscribe((data:any) => {
      this.limpiarRutas();
      this.rutasDesdeBd = [];
      if (data == null || data.length == 0) {
        Swal.fire({ 
          title: 'Información',
          text: 'No hay rutas guardadas',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        });
      } else {
        for (let d of data) {
          this.rutasDesdeBd.push(d);
        }
      }
    });
  }

  loadRutaDesdeBd(idx: number) {
    this.actividadesEnRuta = JSON.parse(this.rutasDesdeBd[idx].actividades);
    this.numeroActividadesEnRuta = this.actividadesEnRuta.length;
    this.idRutaActiva = this.rutasDesdeBd[idx].id;
    localStorage.setItem('idRutaActiva', this.idRutaActiva.toString());
    this.saveRutaEnLocalStorage();
    this.mostrarMenuUsuario = false;
  }

  limpiarRutas() {
    this.actividadesEnRuta = [];
    this.numeroActividadesEnRuta = 0;
    this.idRutaActiva = -1;
    localStorage.removeItem('ruta');
    localStorage.removeItem('idRutaActiva');
  }

  eliminarRutaServer(idx: number) {
    Swal.fire({ 
      title: 'Confirmación',
      text: '¿Está seguro que desea eliminar la ruta ' + this.rutasDesdeBd[idx].nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('eliminando ruta');
        this.mapaService.deleteRuta(this.rutasDesdeBd[idx].id).subscribe((data:any) => {
          console.log('ruta eliminada');
          console.log(data);
          this.rutasDesdeBd.splice(idx, 1);
          this.limpiarRutas();
        });
      }
    });
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

  volverAObjetivos() {
    this.router.navigate(["objetivos", this.idRed]);
  }
}
