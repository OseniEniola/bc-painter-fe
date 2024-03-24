import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseResponse} from "../models/BaseResponse";
import {User} from "../models/user-data.dto";
import {CreateOrder, PaintOrder} from "../models/paint-order.dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseUrl
  constructor(private httpClient: HttpClient) { }

  getOrderByUserId(user_id:any):Observable<BaseResponse<PaintOrder[]>>{
    return this.httpClient.get<BaseResponse<PaintOrder[]>>(`${this.baseUrl}/order/${user_id}`)
  }

  getAllOrders():Observable<BaseResponse<PaintOrder[]>>{
    return this.httpClient.get<BaseResponse<PaintOrder[]>>(`${this.baseUrl}/order`)
  }

  createOrder(body:CreateOrder): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/order/create`,body)
  }

  completeOrder(body:any): Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/order/complete`,body)
  }
}
