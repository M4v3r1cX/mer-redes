export class TMDto {
    id: string;
    descripcion: string;
    idOa: string;
    codigoOa: string;
    redes: string[];
    niveles: string[];

    constructor() {
        this.id = "";
        this.descripcion = "";
        this.idOa = "";
        this.codigoOa = "";
        this.redes = [];
        this.niveles = [];
    }
}