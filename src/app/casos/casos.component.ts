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

}
