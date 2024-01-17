import { Component, OnInit } from '@angular/core';
import { AddactividadComponent } from '../addactividad/addactividad.component';
import { DeleteactividadComponent } from '../deleteactividad/deleteactividad.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActividadService } from 'src/app/services/actividad.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-actividadesmaintainer',
  templateUrl: './actividadesmaintainer.component.html',
  styleUrls: ['./actividadesmaintainer.component.css']
})
export class ActividadesmaintainerComponent {
  constructor(public dialog: MatDialog, public actividadService: ActividadService, public usersService: UsersService) {}

  actividades: any = [];
  loadingVisible: boolean = false;

  ngOnInit() {
    this.actividadService.getActividades().subscribe((data:any)=>{
      this.actividades = data.actividades;
      console.log(data.actividades);
    });
  }

  openDialogAddActividad() {
    const dialogRef = this.dialog.open(AddactividadComponent, {
      height: '75%',
      width: '80%',
      data: 'Agregar Actividad,-1'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEditActividad(id: number) {
    const dialogRef = this.dialog.open(AddactividadComponent, {
      height: '70%',
      width: '70%',
      data: 'Editar Actividad,' + id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //alert('Función aún no implementada');
  }

  openDialogConfirmDelete(id: number, nombre: string) {
    console.log(id);
    const dialogRef = this.dialog.open(DeleteactividadComponent, {
      data: nombre
    });

    dialogRef.afterClosed().subscribe((eliminar: Boolean) => {
      if(eliminar) {
        this.loadingVisible = true;
        this.actividadService.deleteActividad(id).subscribe((data: any) => {
          window.location.replace("#/actividades");
          window.location.reload();
        });
      }
    });
  }
}
