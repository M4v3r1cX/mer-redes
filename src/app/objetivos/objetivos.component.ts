import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MapasService } from '../services/mapas.service';
import { OaService } from '../services/oa.service';
import { OAMapaDTO } from '../models/OAMapaDTO';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent {

  loginLevantado = false;
  sidenavwidth: number = 0;
  sideBarInfoWidth: number = 0;
  sidebarAbierto = false;
  sideBarInfoAbierto = false;
  sidebarContentLoading = true;
  cardExpanded = false;
  nombreSeccionActiva: string = "";
  id: string | null = "";
  cardOaHeight = 100;
  idRed: string | null ="";
  oasMapa1: OAMapaDTO[] = [];
  oasMapa2: OAMapaDTO[] = [];
  oasMapa3: OAMapaDTO[] = [];
  oasMapa4: OAMapaDTO[] = [];
  oasMapa5: OAMapaDTO[] = [];
  oasMapa6: OAMapaDTO[] = [];
  hijosOaSeleccionado: any[]= [];
  showLoading: boolean = true;
  currentSelectedOa: string = "";
  currentSelectedOaInfo: string = "";
  currentSelectedLevel: string = "";
  lastSelectedPos: number = -1;
  lastSelectedLevel: number = -1;
  
  constructor(public usersService: UsersService, public dialog: MatDialog, private route: ActivatedRoute, public mapaService: MapasService, public oaService: OaService, private router: Router) {
    console.log(usersService.isLoggedIn());
  }

  ngOnInit() {
    this.idRed = this.route.snapshot.paramMap.get('id');
    switch (this.idRed) {
      case '1':
        this.nombreSeccionActiva = 'Números';
        break;
      case '2':
        this.nombreSeccionActiva = 'Campo Aditivo';
        break;
      case '3':
        this.nombreSeccionActiva = 'Campo Multiplicativo';
        break;
      case '4':
        this.nombreSeccionActiva = 'Patrones y Álgebra';
        break;
      case '5':
        this.nombreSeccionActiva = 'Medición';
        break;
      case '6':
        this.nombreSeccionActiva = 'Geometría';
        break;
      case '7':
        this.nombreSeccionActiva = 'Datos y Probabilidades';
        break;
    }
    if (this.idRed != null) {
      this.mapaService.getOasByRed(this.idRed).subscribe((data:any)=>{
        this.agregarCuadros(data);
      });
    }
  }

  levantarLogin() {
    if (!this.loginLevantado) {
      this.loginLevantado = true;
      const dialogRef = this.dialog.open(LoginComponent, {
        height: '300px',
        width: '700px'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.loginLevantado = false;
        this.dialog.closeAll();
      });
    }
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
  
  closeNav() {
    this.sidenavwidth = 0;
  }

  expandCard(idx: number, lvl: number) {
    switch (lvl){
      case 1:
        this.doExpand(this.oasMapa1, idx);
        break;
      case 2:
        this.doExpand(this.oasMapa2, idx);
        break;
      case 3:
        this.doExpand(this.oasMapa3, idx);
        break;
      case 4:
        this.doExpand(this.oasMapa4, idx);
        break;
      case 5:
        this.doExpand(this.oasMapa5, idx);
        break;
      case 6:
        this.doExpand(this.oasMapa6, idx);
        break;
    }
    
  }

  doExpand(collection: any, idx: number) {
    if (!collection[idx].cardExpanded) {
      collection[idx].cardHeight = 300;
      collection[idx].cardExpanded = true;
    } else {
      collection[idx].cardHeight = 100;
      collection[idx].cardExpanded = false;
    }
  }

  agregarCuadros(data: any) {
    console.log(data);
    let height = 0;
    for (let d of data) {
      let oa: OAMapaDTO = new OAMapaDTO();
      let desc:string = d.descripcion;
      oa.descripcion = desc;
      oa.id = d.id;
      oa.nombre = d.codigo;
      oa.height = height += 100;
      oa.seleccionado = false;
      switch (d.idNivel) {
        case 1:
          this.oasMapa1.push(oa);
          break;
        case 2:
          this.oasMapa2.push(oa);
          break;
        case 3:
          this.oasMapa3.push(oa);
          break;
        case 4:
          this.oasMapa4.push(oa);
          break;
        case 5:
          this.oasMapa5.push(oa);
          break;
        case 6:
          this.oasMapa6.push(oa);
          break;
      }
    }
    this.showLoading = false;
  }

  showOaInfo(id: number, posx: number, posy: number) {
    this.checkIfClose();
    this.lastSelectedPos = posy;
    this.lastSelectedLevel = posx;
    if (this.sideBarInfoAbierto) {
      this.openInfo();
    }
    this.openInfo();
    this.currentSelectedLevel = posx + "";
    switch (posx){
      case 1:
        this.oasMapa1[posy].seleccionado = true;
        this.setInfo(this.oasMapa1, posy);
        break;
      case 2:
        this.oasMapa2[posy].seleccionado = true;
        this.setInfo(this.oasMapa2, posy);
        break;
      case 3:
        this.oasMapa3[posy].seleccionado = true;
        this.setInfo(this.oasMapa3, posy);
        break;
      case 4:
        this.oasMapa4[posy].seleccionado = true;
        this.setInfo(this.oasMapa4, posy);
        break;
      case 5:
        this.oasMapa5[posy].seleccionado = true;
        this.setInfo(this.oasMapa5, posy);
        break;
      case 6:
        this.oasMapa6[posy].seleccionado = true;
        this.setInfo(this.oasMapa6, posy);
        break;
    }

    console.log('cargando hijos de id ' + id);
    this.mapaService.getOasHijos(id).subscribe((data:any)=>{
      console.log('hijos cargados');
      this.hijosOaSeleccionado = data;
      console.log(this.hijosOaSeleccionado);
      this.sidebarContentLoading = false;
    });
  }

  setInfo(arr: any, pos: number) {
    this.currentSelectedOa = arr[pos].nombre;
    this.currentSelectedOaInfo = arr[pos].descripcion;
  }

  openInfo() {
    if (!this.sideBarInfoAbierto) {
      this.sideBarInfoWidth = 400;
      this.sideBarInfoAbierto = true;
    } else {
      this.sideBarInfoWidth = 0;
      this.sideBarInfoAbierto = false;
    }
  }

  checkIfClose() {
    if(this.lastSelectedPos != -1 && this.lastSelectedLevel != -1){ 
      switch (this.lastSelectedLevel + "") {
        case '1':
          this.oasMapa1[this.lastSelectedPos].seleccionado = false;
          break;
        case '2':
          this.oasMapa2[this.lastSelectedPos].seleccionado = false;
          break;
        case '3':
          this.oasMapa3[this.lastSelectedPos].seleccionado = false;
          break;
        case '4':
          this.oasMapa4[this.lastSelectedPos].seleccionado = false;
          break;
        case '5':
          this.oasMapa5[this.lastSelectedPos].seleccionado = false;
          break;
        case '6':
          this.oasMapa6[this.lastSelectedPos].seleccionado = false;
          break;
      }
    }
  } 

  cerrarSidebarHijjos() {
    this.checkIfClose();
    this.hijosOaSeleccionado = [];
    this.sideBarInfoWidth = 0;
    this.sideBarInfoAbierto = false;
  }

  irAlMapa(idx: number) {
    let obj = this.hijosOaSeleccionado[idx];
    if (obj != null && obj.x != null && obj.y != null && obj.x != 0 && obj.y != 0) {
      this.router.navigate(["mapas", this.idRed, obj.x, obj.y]);
    } else {
      this.router.navigate(["mapas", this.idRed]);
    }
  }
}
