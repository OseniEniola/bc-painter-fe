import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/user-data.dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private userService: UserService,
              private notify: ToastrService) {
    this.getAllUsers();
  }

  employeeRoles = ['Painter','Manager','Admin','SYS_ADMIN']
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

  isPassVisible = false;
  users : User[]
  isLoading: boolean;
  dataLoading = false;
  newEmployee: boolean;

  selectUser: User
  modalRef?: BsModalRef;

  employeeForm = this.fb.group({
    employeeId: [''],
    firstName: [''],
    lastName: [''],
    role: [''],
    email: [''],
    phone: [''],
    password: ['']
  });
  ngOnInit(): void {
  }

  setValue(field:any, value:any) {
    this.employeeForm.get(field)?.setValue(value);
  }

  createNewUser(template: TemplateRef<any>){
    this.newEmployee = true;
    this.employeeForm.reset();
    this.modalRef = this.modalService.show(template);
  }
  editUser(template: TemplateRef<any>,user: User){
    this.newEmployee = false;
    this.selectUser = user;
    this.employeeForm.patchValue({
      employeeId: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role.toUpperCase(),
      email: user.email,
      phone: user.phone
    })
    this.modalRef = this.modalService.show(template);
  }
  togglePasswordVisibility(id: string) {
    const x = document.getElementById(id) as any;
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  closeModal(template: TemplateRef<any>) {
    this.modalService.hide()
  }

  getAllUsers(){
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: res => {
        this.users = res.data;
        this.isLoading = false;
      },error: err => {
        this.notify.error(err.error.message)
        this.isLoading = false;
      }
    })
  }
  createUser(){
    this.dataLoading = true;
    let body = {
      first_name: this.employeeForm.value.firstName,
      last_name: this.employeeForm.value.lastName,
      email: this.employeeForm.value.email,
      role: this.employeeForm.value.role.toUpperCase(),
      phone: this.employeeForm.value.phone,
      password: this.employeeForm.value.password
    }
    this.userService.createUser(body).subscribe({
      next: res => {
        this.dataLoading = false;
        this.notify.success("User updated successfully")
        this.modalService.hide();
        this.getAllUsers()
      },error : err => {
        this.dataLoading = false
        this.notify.error(err.error.message)
      }
    })
  }
  updateInfo(){
    this.dataLoading = true;
    let body = {
      first_name: this.employeeForm.value.firstName,
      last_name: this.employeeForm.value.lastName,
      email: this.employeeForm.value.email,
      role: this.employeeForm.value.role.toUpperCase(),
      phone: this.employeeForm.value.phone,
      password: this.employeeForm.value.password,
      user_id: this.selectUser.user_id,
  }
    this.userService.updateUser(body).subscribe({
      next: res => {
        this.dataLoading = false;
        this.notify.success("User updated successfully")
        this.modalService.hide();
        this.getAllUsers()
      },error : err => {
        this.dataLoading = false
        this.notify.error(err.error.message)
      }
    })
  }

}
