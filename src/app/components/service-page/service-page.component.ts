import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
