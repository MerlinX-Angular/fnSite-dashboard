import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactComponent implements AfterViewInit {
  constructor() { }

ngAfterViewInit() {
  window.scrollTo(0, 0);
  }

// Scroll to map
scrl(){
  window.scrollTo(0, 750);
}
}
