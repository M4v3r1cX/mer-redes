import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteactividad',
  templateUrl: './deleteactividad.component.html',
  styleUrls: ['./deleteactividad.component.css']
})
export class DeleteactividadComponent {
  constructor(public dialogo: MatDialogRef<DeleteactividadComponent>,
    @Inject(MAT_DIALOG_DATA) public actividad: string) {
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  doDelete(): void {
    this.dialogo.close(true);
  }
}
