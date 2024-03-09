import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import panzoom from "panzoom";
import { ActivatedRoute } from '@angular/router';
import { MapasService } from '../services/mapas.service';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements AfterViewInit {

  loginLevantado = false;
  sidenavwidth: number = 0;
  sidebarAbierto = false;
  idRed: number = 0;

  constructor(private route: ActivatedRoute, public mapaService: MapasService) {

  }

  ngOnInit() {
    console.log('ngOnInit');
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.idRed = params['id'];
        console.log(this.idRed);
      }
    );
    if (this.idRed != null) {
      this.mapaService.getOasByRed(this.idRed).subscribe((data:any)=>{
        console.log(data);
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
}
