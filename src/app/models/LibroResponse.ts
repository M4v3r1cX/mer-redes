import { LibroDTO } from "./LibroDTO";

export class LibroResponse {
    public codigo: number;
    public comentario: string;
    public libros: LibroDTO[];

    constructor() {
        this.codigo = 0;
        this.comentario = "";
        this.libros = [];
    }
}