import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class UsersService {

    REST_URL = environment.apiMerBackend;
    
    constructor(private http: HttpClient, private cookies: CookieService) {}

    login(loginDTO: any){
      return this.http.post(this.REST_URL + "usuario/login", loginDTO);
    }

    register(user: any) {
      return this.http.post(this.REST_URL + "usuario/register", user);
    }

    setToken(token: string) {
      this.cookies.set("token", token);
    }
    
    getToken() {
      return this.cookies.get("token");
    }

    deleteToken() {
      this.cookies.delete("token");
    }

    isLoggedIn() {
      let token: string = this.getToken();
      if (token !== null && token !== "") {
          console.log('token diferente de null');
          if (!this.tokenExpired(token)) {
              return true;
          }
      }

      return false;
    }

    getNombreUsuario() {
      let decodedJWT = JSON.parse(window.atob(this.getToken().split('.')[1]));
      return decodedJWT.name;
    }

    private tokenExpired(token: string) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}