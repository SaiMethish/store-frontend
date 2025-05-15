import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{

  contactForm:FormGroup;

  ngOnInit(): void {
      this.contactForm = new FormGroup({
        name :new FormControl(null,Validators.required),
        email : new FormControl(null,[Validators.required,Validators.email]),
        phone : new FormControl(null, Validators.required),
        message : new FormControl(null,Validators.required)
      })
    }
}