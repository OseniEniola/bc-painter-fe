import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {BsModalRef,BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private fb: FormBuilder,private modalService: BsModalService) { }

  availablePaintList= ['Blue','Grey','Black','White','Purple']
  orderStatusList =['Processing','Completed']
  isFetchingRecords: boolean;
  paintOrder = [
    {status:'PROCESSING'},
    {status:'COMPLETED'},
    {status:'PROCESSING'},
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
    {
      label: '',
      colWidth: '8%'
    }
  ]

  dataLoading = false;
  newOrder: boolean;

  painters = [0,1,2,3,4,5]

  modalRef?: BsModalRef;

  orderForm = this.fb.group({
    orderId: [''],
    houseAddress: [''],
    paintColor: [''],
    noPaintUsed: [''],
    status: [''],
    postalCode:[''],
  });
  ngOnInit(): void {
  }


  setValue(field:any, value:any) {
    this.orderForm.get(field)?.setValue(value);
  }

  openModal(template: TemplateRef<any>, selectedAction:string) {
    this.orderForm.reset();
    this.modalRef = this.modalService.show(template);
    if(selectedAction == 'addOrder') {
      this.newOrder = true;
    }
    if (selectedAction == 'editOrder') {
      this.newOrder = false;
    }
  }

  closeModal(template: TemplateRef<any>) {
    this.modalService.hide()
  }

  searchPainter(event: any){

  }
}
