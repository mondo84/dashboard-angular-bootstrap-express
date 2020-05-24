import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.scss']
})
export class CasosComponent implements OnInit {

  datos = [
            {
              foto: '../../assets/img/users/1-mujer.jpg',
              nombre: 'Erika k.',
              origen: 'Mocarí / Monteria',
              placa: 'cbx-12 de B/quilla.',
              destino: 'Planta Malambo / Barranquilla'
            },
            {
              foto: '../../assets/img/users/3mujer.jpg',
              nombre: 'Ivana M.',
              origen: 'Mocarí / Monteria',
              placa: 'cbx-12 de B/quilla.',
              destino: 'Planta Malambo / Barranquilla'
            },
            {
              foto: '../../assets/img/users/4mujer.jpg',
              nombre: 'Ivana M.',
              origen: 'Mocarí / Monteria',
              placa: 'cbx-12 de B/quilla.',
              destino: 'Planta Malambo / Barranquilla'
            },
            {
              foto: '../../assets/img/users/5mujer.jpg',
              nombre: 'Ivana M.',
              origen: 'Mocarí / Monteria',
              placa: 'cbx-12 de B/quilla.',
              destino: 'Planta Malambo / Barranquilla'
            }
          ];

  constructor() { }

  ngOnInit(): void {
  }

}
