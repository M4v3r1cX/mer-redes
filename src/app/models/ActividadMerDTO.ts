export class ActividadMerDTO {
    nombre: string;
    ubicacionEnLibro: string;
    descripcionActividad: string;
    imagenReferencia: string;
    linkReferencia: string;
    idLibro: string;
    idTm: string;
    idUsuarioCarga: string;

    constructor() {
        this.nombre = "";
        this.ubicacionEnLibro = "";
        this.descripcionActividad = "";
        this.imagenReferencia = "";
        this.linkReferencia = "";
        this.idLibro = "";
        this.idTm = "";
        this.idUsuarioCarga = "";
    }
}