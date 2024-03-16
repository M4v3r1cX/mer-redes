import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../mantenedores/usuarios/login/login.component';
import { ActivatedRoute } from '@angular/router';
import { MapasService } from '../services/mapas.service';
import { OAMapaDTO } from '../models/OAMapaDTO';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent {

  loginLevantado = false;
  sidenavwidth: number = 0;
  sidebarAbierto = false;
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
  showLoading: boolean = true;
  
  constructor(public usersService: UsersService, public dialog: MatDialog, private route: ActivatedRoute, public mapaService: MapasService) {
    console.log(usersService.isLoggedIn());
  }

  ngOnInit() {
    this.idRed = this.route.snapshot.paramMap.get('id');
    if (this.idRed != null) {
      this.mapaService.getOasByRed(this.idRed).subscribe((data:any)=>{
        this.agregarCuadros(data);
      });
    }

    this.nombreSeccionActiva = this.id + '';
  }

  levantarLogin() {
    if (!this.loginLevantado) {
      this.loginLevantado = true;
      const dialogRef = this.dialog.open(LoginComponent, {
        height: '30%',
        width: '40%'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.loginLevantado = false;
        this.dialog.closeAll();
      });
    }
  }

  openNav() {
    //let sidebar = document.getElementById("mySidenav");
    //sidebar?.style['width'] = "":
    if (!this.sidebarAbierto) {
      this.sidenavwidth = 400;
      this.sidebarAbierto = true;
    } else {
      this.sidenavwidth = 0;
      this.sidebarAbierto = false;
    }
    
  }
  
  closeNav() {
    //document.getElementById("mySidenav").style.width = "0";
    this.sidenavwidth = 0;
  }

  expandCard() {
    if (!this.cardExpanded) {
      this.cardOaHeight = 300;
      this.cardExpanded = true;
    } else {
      this.cardOaHeight = 100;
      this.cardExpanded = false;
    }
  }

  agregarCuadros(data: any) {
    console.log(data);
    let height = 0;
    for (let d of data) {
      let oa: OAMapaDTO = new OAMapaDTO();
      let desc:string = d.descripcion;
      /*if (desc.length >  200) {
        desc = desc.substring(0,200);
        desc = desc + "...";
      }*/
      oa.descripcion = desc;
      oa.id = d.id;
      oa.nombre = d.codigo;
      oa.height = height += 100;
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
}
