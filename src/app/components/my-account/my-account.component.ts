import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  userForm!:FormGroup;
  constructor(private fb:FormBuilder){
    this.userForm=fb.group({
      firstName:[""],
      lastName:[""],
      email:[""],
      address:[""],
      oldPassword:[""],
      newPassword:[""],
      confirmPassword:[""]
    });
  }
  updateDetails(){
    console.log(this.userForm.value);
  }
}
