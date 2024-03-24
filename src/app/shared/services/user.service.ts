import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseResponse} from "../models/BaseResponse";
import {User} from "../models/user-data.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl
  constructor(private httpClient: HttpClient) { }

  loginUser(body:any):Observable<BaseResponse<User>>{
    return this.httpClient.post<BaseResponse<User>>(`${this.baseUrl}/user/login`,body)
  }
  getAllPainters():Observable<BaseResponse<User[]>>{
    return this.httpClient.get<BaseResponse<User[]>>(`${this.baseUrl}/user/painters`)
  }
  getAllUsers():Observable<BaseResponse<User[]>>{
    return this.httpClient.get<BaseResponse<User[]>>(`${this.baseUrl}/user`)
  }

  updateUser(body:any):Observable<BaseResponse<any>>{
    return this.httpClient.put<BaseResponse<any>>(`${this.baseUrl}/user/update`,body)
  }
  createUser(body:any):Observable<BaseResponse<any>>{
    return this.httpClient.post<BaseResponse<any>>(`${this.baseUrl}/user/create`,body)
  }
}
