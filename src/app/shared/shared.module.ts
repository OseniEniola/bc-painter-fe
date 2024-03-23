import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './components/layouts/page-layout/page-layout.component';
import {IsFormGroupComponent} from "./components/is-form-group/is-form-group.component";
import {FormErrorComponent} from "./components/form-error/form-error.component";
import {RouterModule} from "@angular/router";
import {ModalModule} from "ngx-bootstrap/modal";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";



@NgModule({
  declarations: [
    PageLayoutComponent,IsFormGroupComponent,FormErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [IsFormGroupComponent,PageLayoutComponent,FormErrorComponent,ModalModule,BsDropdownModule]
})
export class SharedModule { }
