import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import {AuthResponse, Login} from "../../interfaces/Auth"
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoggedIn:boolean=false;
  constructor(private fb: FormBuilder, private authService: AuthService,  private router: Router,
    private spinner:NgxSpinnerService
  ) {
    this.loginForm = fb.group({
      email: [""],
      password: [""]
    })
  }
  requestTokenCall=()=>{
    let intervalId:any;
    let checkInterval=()=>{
      let val=sessionStorage.getItem("expiration-time");
      let time=0;
      if(val){
        time=+val;
      }
      let timeleft=time-Date.now();
      if(timeleft<=30000){
        this.authService.refreshToken();
      }
      intervalId=setInterval(checkInterval,20000);
    }
  }
  login = () => {
    let loginReq:Login={
      username:this.loginForm.value.email,
      password:this.loginForm.value.password
    };
    this.authService.loginApi(loginReq).subscribe({
      next:(res:AuthResponse)=>{
        sessionStorage.setItem("access-token",res.access_token);
        sessionStorage.setItem("refresh-token",res.refresh_token);
        sessionStorage.setItem("expiration-time",res.expirationTime.accessToken);
        this.requestTokenCall();
        this.authService.changeStatus(true);
        this.router.navigate(['home']); 
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>this.spinner.hide()
    })
  }
}
