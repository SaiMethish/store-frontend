import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Register } from 'src/app/interfaces/Auth';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
  private spinner:NgxSpinnerService) {
    this.registerForm = fb.group({
      firstname: [""],
      lastname: [""],
      email:[""],
      password: [""],
    })
  }
  ngOnInit() {
    
  }
  signup=()=>{
    let register:Register={
      firstName:this.registerForm.get('firstname').value,
      lastName:this.registerForm.get('lastname').value,
      username:this.registerForm.get('email').value,
      password:this.registerForm.get('password').value,
      role:"USER"
    };
    this.authService.registerApi(register).subscribe({
      next:(res:any)=>{
        this.spinner.hide();
        this.router.navigate(['login']);
      },
      error:(err:any)=>{
        this.spinner.hide();
      }
    })
  }

};

