import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import {ReactiveFormsModule} from "@angular/forms";
import { InventoryComponent } from './inventory/inventory.component';
import { UserManagementComponent } from './user-management/user-management.component';


@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    InventoryComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
