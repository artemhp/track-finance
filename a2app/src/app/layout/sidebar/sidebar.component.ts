import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

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
