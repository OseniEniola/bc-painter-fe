import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder} from "@angular/forms";
import {InventoryService} from "../../../shared/services/inventory.service";
import {Inventory} from "../../../shared/models/inventory.dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private inventoryService: InventoryService,
              private notify: ToastrService) {

    this.getInventories();
  }

  paints: Inventory[];
  selectedPaint: Inventory;
  isFetchingRecords: boolean;
  dataLoading = false;
  isLoading = true;

  tableColumns = [
    {
      label: 'ID#',
      colWidth: '8%'
    },
    {
      label: 'Color',
      colWidth: '18%'
    },
    {
      label: 'Quantity',
      colWidth: '12%'
    },
    {
      label: '',
      colWidth: '8%'
    }
  ]
  modalRef?: BsModalRef;

  paintEditForm = this.fb.group({
    color_id: [''],
    color: [''],
    quantity: [''],
  });
  ngOnInit(): void {
  }


  setValue(field:any, value:any) {
    this.paintEditForm.get(field)?.setValue(value);
  }

  editPaint(template: TemplateRef<any>, paint: Inventory){
    this.selectedPaint = paint
    this.openModal(template);
    this.paintEditForm.patchValue({
      color_id: this.selectedPaint.id,
      color: this.selectedPaint.color,
      quantity: this.selectedPaint.quantity
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>) {
    this.modalService.hide()
  }

  getInventories(){
    this.isLoading = true;
    this.inventoryService.getAllInventory().subscribe({
      next: res => {
        this.paints = res.data
        this.isLoading = false
      }, error: err => {
        this.notify.error(err.error.message())
      }
    })
  }

  updateRecord(){
    this.dataLoading = true;
    let body = {
      color_id: this.paintEditForm.value.color_id,
      quantity: this.paintEditForm.value.quantity
    }

    this.inventoryService.updateRecord(body).subscribe({
      next: res => {
        this.notify.success("Record updated successfully")
        this.dataLoading = false;
        this.modalService.hide();
        this.getInventories()

      }, error: err => {
        this.dataLoading = false;
        this.notify.error(err.error.message)
      }
    })
  }

}
