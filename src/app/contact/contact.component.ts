import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  chart = [];
  chart2 = [];
  @ViewChild('menu_toogled', {static: true}) menuToogled: ElementRef;
  toggle = true;

  constructor(private objRenderer2: Renderer2) { }

  ngOnInit(): void {
    this.objRenderer2.listen(this.menuToogled.nativeElement, 'click', () => {
      // alert('toggle');
      this.toggle = !this.toggle;
    });

    this.chart = new Chart('ctx' , {
      type: 'doughnut',
      data: {
        labels: ['En ruta', 'En muelle'],
        datasets: [{
          label: 'Unidades moviles',
          data: [12, 19],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(0, 200, 0, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(0, 200, 0, 1)',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        }
      }
    });

    this.chart2 = new Chart('ctx2' , {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [{
          label: 'Ingresos',
          data: [80, 100, 50, 70],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(0, 200, 0, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(0, 200, 0, 1)',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        }
      }
    });

  }

}
