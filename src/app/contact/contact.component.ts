import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('menu_toogled', {static: true}) menuToogled: ElementRef;
  toggle = true;

  constructor(private objRenderer2: Renderer2) { }

  ngOnInit(): void {
    this.objRenderer2.listen(this.menuToogled.nativeElement, 'click', () => {
      // alert('toggle');
      this.toggle = !this.toggle;
    });

  }

}
