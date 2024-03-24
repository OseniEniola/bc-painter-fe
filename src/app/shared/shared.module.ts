import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './components/layouts/page-layout/page-layout.component';
import {IsFormGroupComponent} from "./components/is-form-group/is-form-group.component";
import {FormErrorComponent} from "./components/form-error/form-error.component";
import {RouterModule} from "@angular/router";
import {ModalModule} from "ngx-bootstrap/modal";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";



@NgModule({
  declarations: [
    PageLayoutComponent,IsFormGroupComponent,FormErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [IsFormGroupComponent,PageLayoutComponent,FormErrorComponent,ModalModule,BsDropdownModule,ToastrModule]
})
export class SharedModule { }
