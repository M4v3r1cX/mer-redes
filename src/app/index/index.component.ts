import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../mantenedores/usuarios/login/login.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  loginLevantado = false;

  constructor(public usersService: UsersService, public dialog: MatDialog) {
    console.log(usersService.isLoggedIn());
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
}
