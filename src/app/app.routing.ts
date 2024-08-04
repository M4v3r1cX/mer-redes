import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { AuthGuard } from "./services/authguard";
import { ObjetivosComponent } from "./objetivos/objetivos.component";
import { MapasComponent } from "./mapas/mapas.component";

const appRoutes = [
    { path: "", component: IndexComponent},
    //{ path: "login", component: LoginComponent},
    //{ path: "register", component: RegisterComponent},
    { path: "objetivos/:id", component: ObjetivosComponent },
    //{ path: "tms", component: TmmaintainerComponent, canActivate: [AuthGuard] },        // Respaldo pa que no se me olvide como se hace la wea de que pida el login
    { path: "mapas/:id", component: MapasComponent },
    //{ path: "logout", component: LogoutComponent }
];

export const routing = RouterModule.forRoot(appRoutes);