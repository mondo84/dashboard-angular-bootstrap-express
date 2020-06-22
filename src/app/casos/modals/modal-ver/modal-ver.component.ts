import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-ver',
  templateUrl: './modal-ver.component.html',
  styleUrls: ['./modal-ver.component.scss']
})
export class ModalVerComponent implements OnInit {

  @Input() objModal: any;
  @Input() catchGetSelectedRow: any;

  constructor() { }

  ngOnInit(): void {
  }

  dismissModal() {
    this.objModal.dismiss();
  }

  closeModal() {
    this.objModal.close();
  }
}
