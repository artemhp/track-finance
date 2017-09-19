import { Component, OnInit } from '@angular/core';
import { RecordsListService } from './records-list.service';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css']
})
export class RecordsListComponent implements OnInit {

  private recordsList;
  private loading = true;
  private wallet = '-Ks8ImbZno4lzuN6ixcg';
  constructor(
    private recordsListService: RecordsListService
  ) { }


  ngOnInit() {
    this.recordsList = this.recordsListService.getRecordsList(this.wallet);
    this.recordsList.subscribe(el => this.loading = false)
  }

}
