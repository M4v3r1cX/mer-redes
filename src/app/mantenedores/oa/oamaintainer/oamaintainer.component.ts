import { Component, OnInit } from '@angular/core';
import { AddoaComponent } from '../addoa/addoa.component';
import { DeleteoaComponent } from '../deleteoa/deleteoa.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OaService } from 'src/app/services/oa.service';
import { ViewoahijoComponent } from '../viewoahijo/viewoahijo.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-oamaintainer',
  templateUrl: './oamaintainer.component.html',
  styleUrls: ['./oamaintainer.component.css']
})
export class OamaintainerComponent {
  constructor(public dialog: MatDialog, public oaService: OaService, public usersService: UsersService){}

  oas: any = [];
  loadingVisible: boolean = false;

  ngOnInit() {
    this.loadingVisible = true;
    this.oaService.getOas().subscribe((data:any)=>{
      this.oas = data.oas;
    });
    this.loadingVisible = false;
  }

  openDialogAddOa() {
    /*const dialogRef = this.dialog.open(AddoaComponent, {
      height: '70%',
      width: '70%',
      data: 'Agregar Objetivo Académico,-1'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });*/
    window.location.replace("#/oas/add");
  }

  openDialogEditOa(id: number) {
    /*const dialogRef = this.dialog.open(AddoaComponent, {
      height: '70%',
      width: '70%',
      data: 'Editar Actividad,' + id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });*/
    //alert('Función aún no implementada');
    window.location.replace("#/oas/add?id=" + id);
  }

  openDialogVerHijosOa(id: number, codigo: string) {
    const dialogRef = this.dialog.open(ViewoahijoComponent, {
      height: '70%',
      width: '70%',
      data: codigo + ',' + id
    });
  }

  openDialogConfirmDelete(id: number, nombre: string) {
    console.log(id);
    const dialogRef = this.dialog.open(DeleteoaComponent, {
      data: nombre
    });

    dialogRef.afterClosed().subscribe((eliminar: Boolean) => {
      if(eliminar) {
        this.loadingVisible = true;
        this.oaService.deleteOa(id).subscribe((data: any) => {
          window.location.replace("#/oas");
          window.location.reload();
        });
      }
    });
  }
}
