import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements OnInit {

  objFormNov: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formNovedades();
  }

  formNovedades() {
    this.objFormNov = this.fb.group({
      motor: [false],
      llanta: [false],
      acp: [false],
      descripcion: [
        { value: '', disabled: false },
        { validator: [Validators.required, Validators.minLength(2)]
      }]
    });
  }

  onSubmit() {
    console.log(this.objFormNov.value);
  }

}
