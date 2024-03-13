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

  constructor(private route: ActivatedRoute, public mapaService: MapasService) {

  }

  ngOnInit() {
    console.log('ngOnInit');
    /*this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.idRed = params['id'];
        console.log(this.idRed);
      }
    );*/
    this.idRed = this.route.snapshot.paramMap.get('id');
    if (this.idRed != null) {
      this.mapaService.getOasByRed(this.idRed).subscribe((data:any)=>{
        this.agregarCuadros(data);
      });
    }
    //this.nombreSeccionActiva = this.id + '';
  }

  ngAfterViewInit() {
    panzoom(document.querySelector('#zonamapa')!);
  }

  openNav() {
    //let sidebar = document.getElementById("mySidenav");
    //sidebar?.style['width'] = "":
    if (!this.sidebarAbierto) {
      this.sidenavwidth = 400;
      this.sidebarAbierto = true;
    } else {
      this.sidenavwidth = 0;
      this.sidebarAbierto = false;
    }
    
  }

  agregarCuadros(data: any) {
    let height = 0;
    for (let d of data) {
      let oa: OAMapaDTO = new OAMapaDTO();
      oa.descripcion = d.descripcion;
      oa.id = d.id;
      oa.nombre = d.nombre;
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
  }
}
