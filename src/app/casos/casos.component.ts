import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.scss']
})
export class CasosComponent implements OnInit {

  numAleatorio: number;

  constructor() { }

  ngOnInit(): void {
  }

  addReg() {
    this.numAleatorio = this.getNumeroAleatorio();
  }

  getNumeroAleatorio(): number {
    const momentoActual = new Date();
    const random = Math.floor(Math.random() * 100);
    const contador: number = momentoActual.getTime() + random;
    return contador;
  }

}
