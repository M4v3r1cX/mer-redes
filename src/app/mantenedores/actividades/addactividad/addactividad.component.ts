import { Component, OnInit } from '@angular/core';
import { ActividadMerDTO } from 'src/app/models/ActividadMerDTO';
import { ActividadService } from 'src/app/services/actividad.service';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TmService } from 'src/app/services/tm.service';

@Component({
  selector: 'app-addactividad',
  templateUrl: './addactividad.component.html',
  styleUrls: ['./addactividad.component.css']
})
export class AddactividadComponent {
  dto: ActividadMerDTO;
  libros: any = [];
  redes: any = [];
  titulo: string = "";
  idActividad: string = "";
  searchText = "";
  tms: any = [];
  tmsFiltrados: any = [];
  maxList = 6;
  listaFiltrada = true;
  loadingVisible: boolean = false;
  tmSeleccionado: string = "";
  libroSeleccionado: number = -1;
  imgActual: string = "";
  tieneImagen: boolean = false;

  ngOnInit() {
    this.actividadService.getLibros().subscribe((data:any)=>{
      this.libros = data;
      console.log(this.libros);
    });

    this.tmService.getTms().subscribe((data: any) => {
      this.tms = data;
      console.log(this.tms);
      this.search();
    });
  }

  constructor(public actividadService: ActividadService, public tmService: TmService, @Inject(MAT_DIALOG_DATA) public data: string) {
    var spl = data.split(',');
    this.titulo = spl[0];
    this.idActividad = spl[1];
    this.dto = new ActividadMerDTO;
    if (this.idActividad !== '-1') {
      this.actividadService.getActividad(this.idActividad).subscribe((data: any) => {
        this.dto = data;
        console.log(this.dto);
        this.tmSeleccionado = this.dto.idTm;
        this.libroSeleccionado = + this.dto.idLibro;
        console.log(this.libroSeleccionado);
        if (this.dto.imagenReferencia != null) {
          this.tieneImagen = true;
          this.imgActual = 'data:image/jpg;base64,' + this.dto.imagenReferencia;
        }
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
    let filtrados = 0;
    if (this.searchText === "") {
      /*if (this.tms.length > this.maxList) {
        this.tmsFiltrados = this.tms.slice(0,this.maxList - 1);
        this.listaFiltrada = true;
      } else {*/
        this.tmsFiltrados = this.tms;
      //}
    } else {
      this.tmsFiltrados = this.tms.filter((element: any) => {
        //if (filtrados < this.maxList) {
          //filtrados++;
          return element.codigoOa.toLowerCase().includes(this.searchText.toLowerCase()) || element.descripcion.toLowerCase().includes(this.searchText.toLowerCase()) || element.id.toLowerCase().includes(this.searchText.toLowerCase());
        //}
      });
    }
  }

  guardarActividad() {
    console.log(this.dto);
    this.loadingVisible = true;
    this.actividadService.save(this.dto).subscribe((data: any) => {
      window.location.replace("#/actividades");
      window.location.reload();
    });
  }

  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      if (fileInput.target.files[0].type === 'image/jpeg' || 
          fileInput.target.files[0].type === 'image/png' || 
          fileInput.target.files[0].type ==='image/jpg') {
          if (fileInput.target.files[0].size < 5000000) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {
                const imgBase64Path = e.target.result;
                this.dto.imagenReferencia = imgBase64Path;
                this.tieneImagen = true;
                this.imgActual = this.dto.imagenReferencia;
                //console.log(imgBase64Path);
              };
            };
            reader.readAsDataURL(fileInput.target.files[0]);
          } else {
            alert('Archivo no puede superar los 5MB de tamaño.');
            this.imgActual = "";
            this.tieneImagen = false;
            this.dto.imagenReferencia = "";
          }
      } else {
        alert('Archivo debe ser JPG o PNG.');
        this.tieneImagen = false;
        this.imgActual = "";
        this.dto.imagenReferencia = "";
      }
    }
  }

  radioChange(event: any) {
    console.log(event);
    this.dto.idTm = event.value;
    console.log(this.dto);
  }

  radioLibroChange(event: any) {
    console.log(event);
    this.dto.idLibro = event.value;
    console.log(this.dto);
  }
}
