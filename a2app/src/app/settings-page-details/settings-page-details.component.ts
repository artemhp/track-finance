import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings-page-details',
  templateUrl: './settings-page-details.component.html',
  styleUrls: ['./settings-page-details.component.css']
})
export class SettingsPageDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  wallet;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.wallet = params['id'];
    });
  }

}
