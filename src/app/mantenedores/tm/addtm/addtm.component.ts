import { Component, OnInit } from '@angular/core';
import { TMDto } from 'src/app/models/TMDto';
import { Inject } from '@angular/core';
import { TmService } from 'src/app/services/tm.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addtm',
  templateUrl: './addtm.component.html',
  styleUrls: ['./addtm.component.css']
})
export class AddtmComponent {
  dto: TMDto;
  oas: any = [];
  searchText = "";
  oasFiltrados: any = [];
  titulo: string = "";
  idTm: string = "";
  listaFiltrada = true;
  loadingVisible: boolean = false;
  oaSeleccionado: string = "";

  ngOnInit() {
  }

  constructor(public tmService: TmService, @Inject(MAT_DIALOG_DATA) public data: string) {
    this.dto = new TMDto();
    var spl = data.split(',');
    this.titulo = spl[0];
    this.idTm = spl[1];
    this.tmService.getOaTm().subscribe((data: any) => {
      console.log(data);
      this.oas = data;
      this.search();
    });
    if (this.idTm !== '-1') {
      this.tmService.getTm(this.idTm).subscribe((data: any) => {
        this.dto = data;
        this.oaSeleccionado = this.dto.idOa;
        console.log(this.oaSeleccionado);
      });
    }
  }

  searchKey(data: string) {
    console.log('searchKey');
    console.log(data);
    this.searchText = data;
    this.search();
  }

  search() {
    console.log('search');
    this.oasFiltrados = this.searchText === ""? this.oas : this.oas.filter((element: any) => {
      return element.codigo.toLowerCase().includes(this.searchText.toLowerCase()) || element.descripcion.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  guardarTm() {
    this.loadingVisible = true;
    this.tmService.save(this.dto).subscribe((data: any) => {
      window.location.replace("#/tms");
      window.location.reload();
    });
  }

  radioChange(event: any) {
    console.log(event);
    this.dto.idOa = event.value;
    console.log(this.dto);
  }
}
