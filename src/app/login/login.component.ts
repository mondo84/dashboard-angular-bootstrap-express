import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('btnInicio', { static: true }) btnInicio: ElementRef;  // Vista hijo del componente.
  objFormLogin: FormGroup;

  constructor(
    private objR2: Renderer2,
    private objRoute: Router,
    private fb: FormBuilder,
    private argSL: LoginService) { }

  ngOnInit(): void {
    this.formLogin();

    this.objR2.listen(this.btnInicio.nativeElement, 'click', (e) => {
      console.log(this.btnInicio.nativeElement);
    });
  }

  onSubmit() {
    // console.log(this.objFormLogin.value);
    const isValid = this.objFormLogin.valid;
    const objJson = this.objFormLogin.getRawValue();  // Devuelve campos disabled y enabled.

    const isValidated = this.argSL.validaUser( objJson, isValid );

    if (isValidated) {
      this.objRoute.navigate(['home']);
    }
  }

  private formLogin() {
    this.objFormLogin = this.fb.group({
      email: [
              { value: '', disabled: false },
              { validators: [
                  Validators.required,
                  Validators.minLength(2)
                ]
              }
            ],
      password: [{ value: '', disabled: false },
                  { validators: [
                      Validators.required,
                      Validators.minLength(2)
                    ]
                  }
                ]
    });
  }
}
