import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  loginLevantado = false;
  sidenavwidth: number = 0;
  sidebarAbierto = false;
  
  constructor(public usersService: UsersService, public dialog: MatDialog) {
    console.log(usersService.isLoggedIn());
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
}
