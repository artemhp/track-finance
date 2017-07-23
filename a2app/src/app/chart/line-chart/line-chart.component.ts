import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // lineChart
  public lineChartData: Array<any> = [
    {
      data: ['5', '10', '12', '12', '10', '11', '40', '44', '40', '30', '50', '52', '52', '60', '60'],
      label: 'Series A'
    }
  ];
  public lineChartLabels: Array<any> = ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29'];
  public lineChartOptions: any = {
    scales: {
      xAxes: [{
        type: "time",
        time: {
          format: 'MM/DD/YYYY HH:mm',
          // round: 'day'
          tooltipFormat: 'll HH:mm'
        },
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      },],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    },
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
