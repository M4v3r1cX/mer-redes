import { Component, OnInit } from '@angular/core';
import { AddlibroComponent } from '../addlibro/addlibro.component';
import { DeletelibroComponent } from '../deletelibro/deletelibro.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libromaintainer',
  templateUrl: './libromaintainer.component.html',
  styleUrls: ['./libromaintainer.component.css']
})
export class LibromaintainerComponent implements OnInit {
  constructor(public dialog: MatDialog, public libroService: LibroService) {}

  libros: any = [];

  ngOnInit() {
    this.libroService.getLibros().subscribe((data:any)=>{
      this.libros = data.entidades;
    });
  }

  openDialogAddLibro() {
    const dialogRef = this.dialog.open(AddlibroComponent, {
      height: '300px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogConfirmDelete(id: number, nombre: string) {
    console.log(id);
    const dialogRef = this.dialog.open(DeletelibroComponent, {
      data: nombre
    });

    dialogRef.afterClosed().subscribe((eliminar: Boolean) => {
      if(eliminar) {
        this.libroService.deleteLibro(id).subscribe((data: any) => {
          window.location.replace("/libros");
        });
      }
    });
  }
}
