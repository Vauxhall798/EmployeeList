import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthServicesService } from 'src/app/Auth/auth-services.service';
import { Employees } from 'src/app/Auth/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  p=1;
  term!:string;
  noData!:boolean


  constructor(private auth:AuthServicesService) { }
   employee!:any
   updown:boolean=true
  ngOnInit(): void {
    this.auth.getEmployees().subscribe(
      (data)=>{
        if(data.length === 0 ){
          this.noData=true;
          console.log("noData")
        }else if(data.length!==0){
          this.noData=false;
          console.log("Data");
          this.employee=data
        }
        console.log(data)


      },
      (err:any)=>{
        console.log(err.message)
        this.noData=true
      },

    )

    // this.auth.getEmployeesWithFeedback().subscribe(
      // (data)=>console.log(data)
    // )
  }





  toggle(){
    this.updown=!this.updown
  }

}
