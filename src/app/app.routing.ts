import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./mantenedores/usuarios/login/login.component";
import { RegisterComponent } from "./mantenedores/usuarios/register/register.component";
import { AppComponent } from "./app.component";
import { LibromaintainerComponent } from "./mantenedores/libros/libromaintainer/libromaintainer.component";
import { ActividadesmaintainerComponent } from "./mantenedores/actividades/actividadesmaintainer/actividadesmaintainer.component";
import { IndexComponent } from "./index/index.component";
import { OamaintainerComponent } from "./mantenedores/oa/oamaintainer/oamaintainer.component";
import { AddoaComponent } from "./mantenedores/oa/addoa/addoa.component";
import { TmmaintainerComponent } from "./mantenedores/tm/tmmaintainer/tmmaintainer.component";
import { AuthGuard } from "./services/authguard";
import { LogoutComponent } from "./mantenedores/usuarios/login/logout.component";
import { ObjetivosComponent } from "./objetivos/objetivos.component";

const appRoutes = [
    { path: "", component: IndexComponent},
    { path: "login", component: LoginComponent},
    { path: "register", component: RegisterComponent},
    { path: "libros", component: LibromaintainerComponent, canActivate: [AuthGuard]},
    { path: "actividades", component: ActividadesmaintainerComponent, canActivate: [AuthGuard]},
    { path: "oas", component: OamaintainerComponent, canActivate: [AuthGuard] },
    { path: "oas/add", component: AddoaComponent, canActivate: [AuthGuard] },
    { path: "oas/add/:id", component: AddoaComponent, canActivate: [AuthGuard] },
    { path: "objetivos/:id", component: ObjetivosComponent },
    { path: "tms", component: TmmaintainerComponent, canActivate: [AuthGuard] },
    { path: "logout", component: LogoutComponent }
];

export const routing = RouterModule.forRoot(appRoutes);