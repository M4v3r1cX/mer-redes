import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string;
  password: string;
  loadingVisible: boolean = false;

  constructor(public userService: UsersService, public router: Router, public dialog: MatDialogRef<LoginComponent>) {
    this.email = "";
    this.password = "";
  }

  login() {
    this.loadingVisible = true;
    const loginDTO = { usuario: this.email, password: this.password };
    this.userService.login(loginDTO).subscribe((data: any) => {
      console.log(data);
      this.userService.setToken(data.comentario);
      this.router.navigateByUrl("/");
      this.dialog.close();
    });
  }
}
