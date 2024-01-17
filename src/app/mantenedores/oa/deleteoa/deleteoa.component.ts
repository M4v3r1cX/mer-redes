import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteoa',
  templateUrl: './deleteoa.component.html',
  styleUrls: ['./deleteoa.component.css']
})
export class DeleteoaComponent {

  constructor(public dialogo: MatDialogRef<DeleteoaComponent>,
    @Inject(MAT_DIALOG_DATA) public nombre: string) {
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  doDelete(): void {
    this.dialogo.close(true);
  }
}
