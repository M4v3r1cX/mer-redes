export class OaHijoDTO {
    descripcion: string;
    redes: string[];
    niveles: string[];
    prioridad: boolean;

    constructor() {
        this.descripcion = "";
        this.redes = [];
        this.niveles = [];
        this.prioridad = false;
    }
}