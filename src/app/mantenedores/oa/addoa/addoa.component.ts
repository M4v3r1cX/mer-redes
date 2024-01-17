import { Component } from '@angular/core';
import { OaDTO } from 'src/app/models/OaDTO';
import { Inject } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { OaService } from 'src/app/services/oa.service';
import { OaHijoDTO } from 'src/app/models/OaHijoDTO';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addoa',
  templateUrl: './addoa.component.html',
  styleUrls: ['./addoa.component.css']
})
export class AddoaComponent {
  dto: OaDTO = new OaDTO();;
  redes: any = [];
  niveles: any = [];
  libros: any = [];
  loadingVisible: boolean = false;
  id: string | null = "";
  nivelSeleccionado: string = "";
  tieneHijo: boolean = false;

  ngOnInit() {
    this.niveles = ["1","2","3","4","5","6"];

    //this.id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.id = params['id'];
        console.log(this.id);
      }
    );
    console.log(this.id);
    if (this.id != null) {
      this.oaService.getOa(this.id).subscribe((data:any)=>{
        this.dto = data;
        console.log(this.dto);
        this.nivelSeleccionado = this.dto.niveles[0];
        console.log(this.nivelSeleccionado);
        if (this.dto.hijos.length > 0) {
          this.tieneHijo = true;
        }
      });
    }
  }

  constructor(public oaService: OaService, public usersService: UsersService, private route: ActivatedRoute) {
    this.oaService.getRedes().subscribe((data:any)=>{
      this.libros = data.libros;
      this.redes = data.redes;
      console.log(this.libros);
      console.log(this.redes);
    });
  }

  onCheckRedChange(event: any) {
    if(event.checked) {
      this.dto.redes.push(event.source.value);
    } else {
      this.dto.redes.forEach((r: string, index) => {
        if (r == event.source.value) {
          this.dto.redes.splice(index, 1);
        }
      });
    }
    console.log(this.dto.redes);
  }

  onCheckNvlChange(event: any) {
    console.log(event);
    this.dto.niveles.push(event.value);
    console.log(this.dto);
    /*if(event.checked) {
      this.dto.niveles.push(event.source.value);
    } else {

      this.dto.niveles.forEach((r: string, index) => {
        if (r == event.source.value) {
          this.dto.niveles.splice(index, 1);
        }
      });
    }*/
  }

  onCheckPriorizadoChange(event: any) {
    if(event.checked) {
      this.dto.prioridad = true;
    } else {
      this.dto.prioridad = false;
    }
  }

  guardarOa() {
    this.loadingVisible = true;
    this.oaService.save(this.dto).subscribe((data: any) => {
      window.location.replace("#/oas");
    });
  }

  agregarHijo() {
    this.tieneHijo = true;
    let oa: OaHijoDTO = new OaHijoDTO();
    this.dto.hijos.push(oa);
  }

  onCheckRedHijoChange(event: any, idx: number) {
    console.log(this.dto.hijos);
    if(event.checked) {
      this.dto.hijos[idx].redes.push(event.source.value);
    } else {
      this.dto.hijos[idx].redes.forEach((r: string, index) => {
        if (r == event.source.value) {
          this.dto.hijos[idx].redes.splice(index, 1);
        }
      });
    }
  }

  onCheckNvlHijoChange(event: any, idx: number) {
    console.log(this.dto.hijos);
    if(event.checked) {
      this.dto.hijos[idx].niveles.push(event.source.value);
    } else {
      this.dto.hijos[idx].niveles.forEach((r: string, index) => {
        if (r == event.source.value) {
          this.dto.hijos[idx].niveles.splice(index, 1);
        }
      });
    }
  }

  onCheckPriorizadoHijoChange(event: any, idx: number) {
    this.dto.hijos[idx].prioridad = event.checked;
  }

  quitarHijo(idx: number) {
    this.dto.hijos.splice(idx, 1);
  }
  
  cancelar() {
    window.location.replace("#/oas");
  }
}
