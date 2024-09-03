import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { AuthGuard } from "./services/authguard";
import { ObjetivosComponent } from "./objetivos/objetivos.component";
import { MapasComponent } from "./mapas/mapas.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./login/logout.component";

const appRoutes = [
    { path: "", component: IndexComponent},
    { path: "login", component: LoginComponent},
    //{ path: "register", component: RegisterComponent},
    { path: "objetivos/:id", component: ObjetivosComponent },
    { path: "mapas/:id", component: MapasComponent },
    { path: "mapas/:id/:x/:y", component: MapasComponent },
    { path: "logout", component: LogoutComponent }
];

export const routing = RouterModule.forRoot(appRoutes);