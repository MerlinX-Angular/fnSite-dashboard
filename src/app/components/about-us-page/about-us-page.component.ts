import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.css']
})
export class AboutUsComponent implements OnInit,AfterViewInit {
  x = {};
  constructor() { }

  ngOnInit() {
    // progress bar movement
    $(document).scroll(function () {
    var x = $(".progress").position();
    if(x == undefined){
      return false;
    }
    var y = $(this).scrollTop();
    
    if (y > (x.top - 10)) {
      $(".progress-bar").addClass(
        "fadeInLeft");
      }
      else {
        $(".progress-bar").removeClass(
          "");
        }
      });
    }
    // Page begins at the top
    ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

}
