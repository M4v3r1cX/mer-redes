import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-deletetm',
  templateUrl: './deletetm.component.html',
  styleUrls: ['./deletetm.component.css']
})
export class DeletetmComponent {
  constructor(public dialogo: MatDialogRef<DeletetmComponent>,
    @Inject(MAT_DIALOG_DATA) public nombre: string) {
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  doDelete(): void {
    this.dialogo.close(true);
  }
}
