import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../mantenedores/usuarios/login/login.component';
import { ActivatedRoute } from '@angular/router';

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
  
  constructor(public usersService: UsersService, public dialog: MatDialog, private route: ActivatedRoute) {
    console.log(usersService.isLoggedIn());
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.id = params['id'];
        console.log(this.id);
      }
    );

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
}
