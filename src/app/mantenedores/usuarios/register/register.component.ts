import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string;
  email: string;
  password: string;
  password2: string;

  constructor(public userService: UsersService) {
    this.nombre = "";
    this.email = "";
    this.password = "";
    this.password2 = "";
  }

  register() {
    const user = { nombre: this.nombre, password: this.password, password2: this.password2, email: this.email};
    this.userService.register(user).subscribe((data: any) => {
      this.userService.setToken(data.token);
    });
  }
}