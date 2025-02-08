import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private http: HttpClient
  ) {
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

  }

};

