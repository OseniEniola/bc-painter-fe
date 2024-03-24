import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user-data.dto";
import {UtilitesService} from "../../../services/utilites.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent implements OnInit {
  activeMenu = 'dashboard';
  manageActive = false;
  userInfo: string;
  logOutConfirm: boolean = false;

  loggedinUser: User | null
  constructor(private utilities: UtilitesService,private router: Router) {
    this.loggedinUser = utilities.getLoggedInUserData()
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('user_date')
    this.router.navigateByUrl("/")
  }

}
