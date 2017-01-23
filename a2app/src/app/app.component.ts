import { Component } from '@angular/core';
declare var $:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  ngOnInit() {
    $('.button-navigation').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true,
      draggable: true
    });
    $(".drag-target").on("swipeleft", function () {
      $("#sidenav-overlay").trigger("click");
    });
  }
}
