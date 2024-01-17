import { OaHijoDTO } from "./OaHijoDTO";

export class OaDTO {
    codigo: string;
    descripcion: string;
    redes: string[];
    niveles: string[];
    prioridad: boolean;
    hijos: OaHijoDTO[];

    constructor() {
        this.codigo = "";
        this.descripcion = "";
        this.redes = [];
        this.niveles = [];
        this.prioridad = false;
        this.hijos = [];
    }
}