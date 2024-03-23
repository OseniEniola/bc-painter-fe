import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private fb: FormBuilder,private modalService: BsModalService) { }

  employeeRoles = ['Painter','Manager','Admin']
  isFetchingRecords: boolean;
  tableColumns = [
    {
      label: 'Employee ID#',
      colWidth: '8%'
    },
    {
      label: 'First Name',
      colWidth: '18%'
    },
    {
      label: 'Last Name',
      colWidth: '12%'
    },
    {
      label: 'Phone No',
      colWidth: '10%'
    },
    {
      label: 'Role',
      colWidth: '12%'
    },
    {
      label: '',
      colWidth: '8%'
    }
  ]

  users = [0,1,2,3,4,5]
  dataLoading = false;
  newEmployee: boolean;

  modalRef?: BsModalRef;

  employeeForm = this.fb.group({
    employeeId: [''],
    firstName: [''],
    lastName: [''],
    role: [''],
    phone: [''],
  });
  ngOnInit(): void {
  }

  setValue(field:any, value:any) {
    this.employeeForm.get(field)?.setValue(value);
  }

  openModal(template: TemplateRef<any>, selectedAction:string) {
    this.employeeForm.reset();
    this.modalRef = this.modalService.show(template);
    if(selectedAction == 'addUser') {
      this.newEmployee = true;
    }
    if (selectedAction == 'editUser') {
      this.newEmployee = false;
    }
  }

  closeModal(template: TemplateRef<any>) {
    this.modalService.hide()
  }


}
