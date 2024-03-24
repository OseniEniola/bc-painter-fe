import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Inventory} from "../models/inventory.dto";
import {BaseResponse} from "../models/BaseResponse";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseUrl = environment.baseUrl
  constructor(private httpClient: HttpClient) { }


  getAllInventory(): Observable<BaseResponse<Inventory[]>>{
    return this.httpClient.get<BaseResponse<Inventory[]>>(`${this.baseUrl}/inventory`)
  }

  updateRecord(body:any): Observable<BaseResponse<any>>{
    return this.httpClient.put<BaseResponse<any>>(`${this.baseUrl}/inventory/update`,body)
  }
}
