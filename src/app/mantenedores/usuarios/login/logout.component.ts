import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  template: '',
  styleUrls: ['./login.component.css']
})

export class LogoutComponent {

  constructor(public userService: UsersService, public router: Router) {
    userService.deleteToken();
    this.router.navigate(['/']);
  }
}
