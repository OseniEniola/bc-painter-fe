import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  availablePaintList= ['Blue','Grey','Black','White','Purple']

  isFetchingRecords: boolean;
  paintOrder = [
    {status:'PROCESSING'},
    {status:'PROCESSING'},
    {status:'COMPLETED'},
    {status:'COMPLETED'}
  ]
  tableColumns = [
    {
      label: 'Order ID#',
      colWidth: '8%'
    },
    {
      label: 'House Address',
      colWidth: '18%'
    },
    {
      label: 'Paint Color',
      colWidth: '12%'
    },
    {
      label: 'No of Used Paints',
      colWidth: '10%'
    },
    {
      label: 'Order Status',
      colWidth: '10%'
    },
  ]

  ngOnInit(): void {
  }

}
