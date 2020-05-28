import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss']
})
export class ModalEliminarComponent implements OnInit, OnChanges {

  @Input() idDelete: number;
  @Input() numeroRandom: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // console.log(`Borra este id: ${this.idDelete}`);
    // console.log(this.numeroRandom);
  }
}
