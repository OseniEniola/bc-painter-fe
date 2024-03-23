import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {OrdersComponent} from "./orders/orders.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {UserManagementComponent} from "./user-management/user-management.component";

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent
  },

  {
    path:'orders',
    component: OrdersComponent
  },
  {
    path:'inventory',
    component: InventoryComponent
  },
  {
    path:'user-management',
    component: UserManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
