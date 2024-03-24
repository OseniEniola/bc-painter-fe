import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BC-painters-hub';

  isLoading: boolean;

  constructor(private router: Router) {

    this.router.events.pipe()
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.isLoading = true;
        }
        if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.isLoading = false;
        }
      });

  }
}
