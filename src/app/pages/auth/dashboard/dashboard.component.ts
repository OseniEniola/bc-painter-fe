import {Component, OnInit, TemplateRef} from '@angular/core';
import {Inventory} from "../../../shared/models/inventory.dto";
import {InventoryService} from "../../../shared/services/inventory.service";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../../shared/services/order.service";
import {UtilitesService} from "../../../shared/services/utilites.service";
import {CompleteOrder, PaintOrder} from "../../../shared/models/paint-order.dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private inventoryService: InventoryService,
              private notify: ToastrService,
              private orderService: OrderService,
              private  utilityService: UtilitesService,
              private modalService: BsModalService,
              private fb: FormBuilder) {
    this.getInventories()
    this.getPaintOrder()
  }

  isLoading = true

  inventories: Inventory[]
  paintOrder: PaintOrder[]

  availablePaintList= ['Blue','Grey','Black','White','Purple']

  isFetchingRecords: boolean;

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
      colWidth: '10%'
    }
  ]
  dataLoading = false;

  selectedOrder: PaintOrder;
  orderStatusList =['Processing','Completed']
  modalRef?: BsModalRef;

  orderForm = this.fb.group({
    orderId: [''],
    houseAddress: ['',[Validators.required]],
    paintColor: ['',[Validators.required]],
    noPaintUsed: [''],
    status: [''],
    painter:['',[Validators.required]],
    postalCode:[''],
  });

  ngOnInit(): void {
  }

  getInventories(){
    this.inventoryService.getAllInventory().subscribe({
      next: res => {
        this.inventories = res.data
        this.isLoading = false
      }, error: (err) => {
        this.isLoading = false
        this.notify.error(err.error.message)
      }
    })
  }

  getPaintOrder(){
    this.orderService.getOrderByUserId(this.utilityService.getLoggedInUserData()?.user_id).subscribe({
      next: res => {
        this.paintOrder = res.data
        this.isLoading = false
      }, error: (err) => {
        this.isLoading = false
        this.notify.error(err.error.message)
      }
    })
  }

  openModal(template: TemplateRef<any>, orderDetails:PaintOrder) {
    this.selectedOrder = orderDetails
    this.orderForm.reset();
    this.orderForm.patchValue({
      orderId: orderDetails.id,
      houseAddress: orderDetails.address,
      paintColor: orderDetails.color,
      status: orderDetails.order_status,
      noPaintUsed: orderDetails.paint_used
    });

    this.modalRef = this.modalService.show(template);

  }

  setValue(field:any, value:any) {
    this.orderForm.get(field)?.setValue(value);
  }

  closeModal(template: TemplateRef<any>) {
    this.modalService.hide()
  }

  completeOrder(){
    this.dataLoading = true
    let body: CompleteOrder = {} as CompleteOrder

    body.order_id = this.selectedOrder.id;
    body.color_id = this.selectedOrder.color_id;
    body.no_paint_used = this.orderForm.value.noPaintUsed;
    body.painter_id = this.selectedOrder.painter_id;

    this.orderService.completeOrder(body).subscribe({
      next: res => {
        this.dataLoading = false;
        this.notify.success("Order Completed");
        this.getPaintOrder()
        this.getInventories()
        this.modalService.hide()
      }, error: err => {
        this.notify.error(err.error.message)
        this.dataLoading = false
      }
    })
  }
}
