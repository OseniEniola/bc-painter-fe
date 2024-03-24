import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BsModalRef,BsModalService} from "ngx-bootstrap/modal";
import {InventoryService} from "../../../shared/services/inventory.service";
import {Inventory} from "../../../shared/models/inventory.dto";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../../shared/services/order.service";
import {CreateOrder, PaintOrder} from "../../../shared/models/paint-order.dto";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/user-data.dto";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private inventoryService: InventoryService,
              private notify: ToastrService,
              private orderService: OrderService,
              private userService: UserService) {

    this.getInventories()
    this.getPaintOrder()
    this.getAllPainters()
  }

  orderStatusList =['Processing','Completed']
  isFetchingRecords: boolean;

  painters: User[]
  selectedPainter: User
  selectedColor: Inventory;

  isLoading = true
  inventories: Inventory[]
  paintOrder: PaintOrder[]
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

  getAllPainters(){
    this.userService.getAllPainters().subscribe({
      next: res => {
        this.painters = res.data
        this.isLoading = false
      }, error: (err) => {
        this.isLoading = false
        this.notify.error(err.error.message)
      }
    })
  }

  getPaintOrder(){
    this.orderService.getAllOrders().subscribe({
      next: res => {
        console.log(res)
        this.paintOrder = res.data
        this.isLoading = false
      }, error: (err) => {
        this.isLoading = false
        this.notify.error(err.error.message)
      }
    })
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

  createOrder(){
    this.dataLoading = true;
    let body: CreateOrder = {} as CreateOrder;

    body.address = this.orderForm.value.houseAddress;
    body.color = this.selectedColor.color
    body.painter_id = this.selectedPainter.user_id;
    body.color_id = this.selectedColor.id
    this.orderService.createOrder(body).subscribe({
      next: res => {
        this.dataLoading = false;
        this.notify.success('Order created successfully')
        this.getPaintOrder();
        this.modalService.hide()
      },error: err => {
        this.notify.error(err.error.message)
      }
    })
  }
}
