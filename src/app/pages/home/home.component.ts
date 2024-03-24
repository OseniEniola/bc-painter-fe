import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import { ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean;
  isPassVisible = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private notify: ToastrService,
              private router: Router) {
    this.initializeForm()
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(id: string) {
    const x = document.getElementById(id) as any;
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
  loginUser(){
    if(this.loginForm.valid){
      this.isLoading = true;
      let body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.userService.loginUser(body).subscribe({
        next: res => {
          console.log(res)
          localStorage.setItem("user_date", btoa(JSON.stringify(res.data)))
          this.notify.success(`Welcome ${res.data.first_name}`);
          this.router.navigateByUrl("/app/dashboard")
        },error:(err) => {
          this.isLoading = false;
          console.log(err)
          this.notify.error(err.error.message)
        }
      })
    }else{
      this.loginForm.markAllAsTouched()
    }
  }
}
