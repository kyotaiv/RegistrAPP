import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent  implements OnInit {

  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.subscribe(params => {
      console.log(params);
      console.log('Código: ' + params['codigo']);
      console.log('Fecha: ' + params['fecha']);
      console.log('username: ' + params['username']);
    });
  }

  ngOnInit() {
    console.log('Asistencia OnInit!');
  }

}
