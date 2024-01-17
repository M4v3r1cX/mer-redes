import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OaHijoDTO } from 'src/app/models/OaHijoDTO';
import { OaService } from 'src/app/services/oa.service';

@Component({
  selector: 'app-viewoahijo',
  templateUrl: './viewoahijo.component.html',
  styleUrls: ['./viewoahijo.component.css']
})
export class ViewoahijoComponent {

  titulooa: string;
  idOa: string;
  hijos: OaHijoDTO[];

  constructor(public dialogo: MatDialogRef<ViewoahijoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, public oaService: OaService) {
    this.hijos = [];
    var spl = data.split(',');
    this.titulooa = spl[0];
    this.idOa = spl[1];
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  ngOnInit() {
    this.oaService.getHijosOa(this.idOa).subscribe((data:any)=>{
      this.hijos = data;
    });
  }
}
