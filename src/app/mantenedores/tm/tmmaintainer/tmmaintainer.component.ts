import { Component, OnInit } from '@angular/core';
import { AddtmComponent } from '../addtm/addtm.component';
import { DeletetmComponent } from '../deletetm/deletetm.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TmService } from 'src/app/services/tm.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tmmaintainer',
  templateUrl: './tmmaintainer.component.html',
  styleUrls: ['./tmmaintainer.component.css']
})
export class TmmaintainerComponent {
  constructor(public dialog: MatDialog, public tmService: TmService, public usersService: UsersService){}

  tms: any = [];
  loadingVisible: boolean = false;

  ngOnInit() {
    this.tmService.getTms().subscribe((data: any) => {
      this.tms = data;
      console.log(data);
    });
  }

  openDialogAddTm() {
    const dialogRef = this.dialog.open(AddtmComponent, {
      height: '50%',
      width: '70%',
      data: 'Agregar Tarea Matemática,-1'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEditTm(id: number) {
    const dialogRef = this.dialog.open(AddtmComponent, {
      height: '70%',
      width: '70%',
      data: 'Editar Tarea Matemática,' + id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //alert('Función aún no implementada');
  }

  openDialogConfirmDelete(id: number) {
    console.log(id);
    const dialogRef = this.dialog.open(DeletetmComponent, {
      data: "TM-" + id
    });

    dialogRef.afterClosed().subscribe((eliminar: Boolean) => {
      if(eliminar) {
        this.loadingVisible = true;
        this.tmService.deleteTm(id).subscribe((data: any) => {
          window.location.replace("#/tms");
          window.location.reload();
        });
      }
    });
  }
}
