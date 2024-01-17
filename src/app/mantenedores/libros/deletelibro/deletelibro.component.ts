import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deletelibro',
  templateUrl: './deletelibro.component.html',
  styleUrls: ['./deletelibro.component.css']
})
export class DeletelibroComponent {

  constructor(public dialogo: MatDialogRef<DeletelibroComponent>,
    @Inject(MAT_DIALOG_DATA) public libro: string) {
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  doDelete(): void {
    this.dialogo.close(true);
  }
}
