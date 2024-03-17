import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import panzoom from "panzoom";
import { ActivatedRoute } from '@angular/router';
import { MapasService } from '../services/mapas.service';
import { OAMapaDTO } from '../models/OAMapaDTO';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements AfterViewInit {

  loginLevantado = false;
  sidenavwidth: number = 0;
  sidebarAbierto = false;
  idRed: string | null ="";
  oasMapa1: OAMapaDTO[] = [];
  oasMapa2: OAMapaDTO[] = [];
  oasMapa3: OAMapaDTO[] = [];
  oasMapa4: OAMapaDTO[] = [];
  oasMapa5: OAMapaDTO[] = [];
  oasMapa6: OAMapaDTO[] = [];
  showLoading: boolean = true;
  nombreSeccionActiva: string = "";

  constructor(private route: ActivatedRoute, public mapaService: MapasService) {

  }

  ngOnInit() {
    console.log('ngOnInit');
    this.idRed = this.route.snapshot.paramMap.get('id');
    switch (this.idRed) {
      case '1':
        this.nombreSeccionActiva = 'Números';
        break;
      case '2':
        this.nombreSeccionActiva = 'Campo Aditivo';
        break;
      case '3':
        this.nombreSeccionActiva = 'Campo Multiplicativo';
        break;
      case '4':
        this.nombreSeccionActiva = 'Patrones y Álgebra';
        break;
      case '5':
        this.nombreSeccionActiva = 'Medición';
        break;
      case '6':
        this.nombreSeccionActiva = 'Geometría';
        break;
      case '7':
        this.nombreSeccionActiva = 'Datos y Probabilidades';
        break;
    }
    if (this.idRed != null) {
      this.mapaService.getOasHijosByRed(this.idRed).subscribe((data:any)=>{
        this.agregarCuadros(data);
      });
    }
    //this.nombreSeccionActiva = this.id + '';
  }

  ngAfterViewInit() {
    panzoom(document.querySelector('#zonamapa')!,
    {
      smoothScroll: false,
      initialX: 0,
      initialY: 0,
      initialZoom: 0.24
    });
  }

  openNav() {
    if (!this.sidebarAbierto) {
      this.sidenavwidth = 400;
      this.sidebarAbierto = true;
    } else {
      this.sidenavwidth = 0;
      this.sidebarAbierto = false;
    }
    
  }

  agregarCuadros(data: any) {
    console.log(data);
    let height = 0;
    for (let d of data) {
      let oa: OAMapaDTO = new OAMapaDTO();
      let desc:string = d.descripcion;
      oa.descripcion = desc;
      oa.id = d.id;
      oa.nombre = d.codigo;
      oa.height = height += 100;
      switch (d.idNivel) {
        case 1:
          this.oasMapa1.push(oa);
          break;
        case 2:
          this.oasMapa2.push(oa);
          break;
        case 3:
          this.oasMapa3.push(oa);
          break;
        case 4:
          this.oasMapa4.push(oa);
          break;
        case 5:
          this.oasMapa5.push(oa);
          break;
        case 6:
          this.oasMapa6.push(oa);
          break;
      }
    }
    this.showLoading = false;
  }
}
