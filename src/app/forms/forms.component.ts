import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthServicesService } from '../Auth/auth-services.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  userForm!: FormGroup;

  constructor(public formBuilder: FormBuilder,private auth:AuthServicesService,private router:Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({

      email: ['', [Validators.required]],

      password: ['', [Validators.required]]
    })
  }

  get getControl(){
    return this.userForm.controls;
  }

  onSubmit(){
    console.log(this.userForm);
  }
  login(formValues:any){
    console.log(formValues)
    this.auth.login(formValues).subscribe(
      (result:any)=>{
        this.router.navigate(['/list/feedback'])
      },
      (err:Error)=>{
        alert(err.message)
      }
    )

  }
   onlyNumberKey(evt:any) {

    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}


}
