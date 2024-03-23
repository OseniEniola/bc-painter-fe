import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private fb: FormBuilder, private modalService: BsModalService) { }

  paints = [0,1,2,3,4,5]
  isFetchingRecords: boolean;
  dataLoading = false;


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
    orderId: [''],
    color: [''],
    quantity: [''],
  });
  ngOnInit(): void {
  }


  setValue(field:any, value:any) {
    this.paintEditForm.get(field)?.setValue(value);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>) {
    this.modalService.hide()
  }



}
