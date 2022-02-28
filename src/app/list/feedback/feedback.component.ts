
import { HttpClient,  } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthServicesService } from 'src/app/Auth/auth-services.service';

import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  constructor(private auth:AuthServicesService,private http:HttpClient) { }

  dataSource = new MatTableDataSource()

  p:any=1;
  term!:string
  currentDate = new Date();
  lastDate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth() + 1, 0,23,59,59,999);

   firstDay = 1;
   lastDay = this.lastDate.getDate();
   currentDay=this.currentDate.getDate();



  feedback!:string
  id=4;
  limit: number=4;
  month:number=2;
  year:number=2022;
  MonthEnd=false;
  planneddate=`${this.year}-${this.month}-${this.currentDay}`


  updown:boolean=true
  Firsttime!:boolean

  confirmed!:boolean
  SelectedLimit!:number;

  @ViewChild('child1')
  firstChild!: ElementRef;
  @ViewChild('child2')
  secondChild!:ElementRef


    // el=this.firstChild.nativeElement;
    // el2=this.secondChild.nativeElement;



  isEdit=false;

  // message="Please Choose Resources for 1:1 for this Month";

  itemsDetails:any
  empDetails:any

  // employee$:Observable<Employees>=this.auth.getEmployeesWithEmpId("VD123");


   MyGroup:FormGroup=new FormGroup({
     "feedback":new FormControl([Validators.required])
   })

  show:number=this.getNumber();
  initial:string="Choose"

  SearchByMonth(){
    console.log("Month Click")
    this.http.get(`http://localhost:3001/api/v1/employeedetails/random/${this.limit}/year/${this.year}/month/${this.month}`).subscribe(data=>{
      console.log(data)
      this.itemsDetails=data;
    })
  }

  SearchByYear(){
   console.log("YearClick")
   this.http.get(`http://localhost:3001/api/v1/employeedetails/random/${this.limit}/year/${this.year}/month/${this.month}`).subscribe(data=>{
     this.itemsDetails=data;
   })
  }
  SearchByLimit(){
    console.log("YearClick")
    this.http.get(`http://localhost:3001/api/v1/employeedetails/random/${this.limit}/year/${this.year}/month/${this.month}`).subscribe(data=>{
      this.itemsDetails=data;
    })
  }

  Click(){
    console.log("clicked")
    this.http.get(`http://localhost:3001/api/v1/employeedetails/random/${this.limit}/year/${this.year}/month/${this.month}`).subscribe(
      (data:any)=>{
        this.itemsDetails=data
        this.planneddate=`${this.year}-${this.month}-${this.firstDay}`

        console.log(data);

        if(data.length===0){
          this.initial="Choose";
          this.show=2;
        }
        else if(data.length !== 0) {
        this.show=3
        this.isEdit=false
        this.initial="Refresh"
        this.Firsttime=true;
        // this.SelectedLimit=this.limit
        // sessionStorage.setItem("limit",this.SelectedLimit.toString())
      }
        // this.show=3
        // this.initial="Refresh"
        // console.log(data);
      },
      (err)=>{
        this.show=2
        this.initial="Choose"
        // this.message="No Data Available For the Given Data"
      },

    )


  }


  Submit(){
    let i:number=0
    var var_data:any[]=[]



    // console.log(this.itemsDetails);


    for(i=0;i<=this.limit-1;i++){
      var submitData={
        employeeid:this.itemsDetails.map((b:any)=>b=b.employeeid)[i],
        feedback:this.itemsDetails[i].feedback,

      }
      if(submitData.feedback!==null){
      var_data.push(submitData)
     }
    }
    console.log(var_data);



    // data = {'employeeid':this.itemsDetails[i].employeeid,'feedback':this.itemsDetails[i].feedback}
    //  var_data.push(data)
    //  i++;




  // console.log(var_data)
//  for(i=0;i<5;i++){
  this.http.put(`http://localhost:3001/api/v1/employeefeedbacks/`,var_data).subscribe(data=>{
   this.Firsttime=false;
  })
//  }
  window.alert("Submitted Successfully!!")
  localStorage.setItem("Submitted",JSON.stringify(true))

  }
  MapFeedback(){
    const MappedFeedback=[];
    let j=1
     for(j;j<=4;j++){
       var feedbacks={
       feeds:this.itemsDetails.map((b:any)=>b=b.employeefeedbacks.map((a:any)=>a=a.feedback))[j]
      }
       MappedFeedback.push(feedbacks)
     }
     console.log(MappedFeedback)

    }


  getNumber():any{

    if(this.confirmed){
      return 3
    }else{
      return 1
    }
  }
  Confirm(){
    if(window.confirm("Do you want to Confirm?") == true){
      console.log('Confirm');
      let i=0
      let con_data:any[]=[]
      for(i=0;i<=this.limit-1;i++){
      var confirmData={
        employeeid:this.itemsDetails.map((b:any)=>b=b.employeeid)[i],
        planneddate:this.planneddate
      }
      con_data.push(confirmData)
    }

      console.log(con_data);
      this.http.post("http://localhost:3001/api/v1/employeefeedbacks/",con_data).subscribe(data=>{
        console.log(data)
        this.isEdit=true
      })
      localStorage.setItem("locked",JSON.stringify(true))
      localStorage.setItem("limit",this.limit.toString())
    } else {
      console.log('Out')
      this.confirmed=false;

    }
  }
  toggle(){
    this.updown=!this.updown
  }



  ngOnInit(): void {

   /* if(!localStorage.getItem("locked")){
     this.http.get(`http://localhost:3001/api/v1/employeedetails/random/${this.limit}/year/${this.year}/month/${this.month}`).subscribe(
       (data:any)=>{this.itemsDetails=data

       if(data.length===0){
        console.log("Came");
        this.initial="Choose";
        this.show=1;
      }
      else if(data.length!==0) {
      console.log("not")
      this.show=3
      this.isEdit=true;
      this.initial="Refresh"
      this.Firsttime=true
    }

    }
     )
    }*/

    if(localStorage.getItem("locked")){
      let Med

      console.log(localStorage.getItem("limit"));
      if(localStorage.getItem("limit")!=null){
       Med=Number(localStorage.getItem("limit"))
      console.log(Med);
    }

      this.http.get(`http://localhost:3001/api/v1/employeedetails/random/${this.limit}/year/${this.year}/month/${this.month}`).subscribe(
        (data:any)=>{
          this.itemsDetails=data
          console.log(data);


          // this.show=3
          if(data.length===0){
            console.log("Came");
            this.initial="Choose";
            this.show=1;
          }
          else if(data.length!==0) {
          console.log("not")
          this.show=3
          this.isEdit=true;
          this.initial="Refresh"
          this.Firsttime=true

        }

        },
        (err)=>{
          this.show=2
          // this.message="No Data Available For the Given Data"
        },
        ()=>console.log("Finished")
      )
    }



    console.log(this.currentDay);
    console.log(this.lastDay);

    // if(this.currentDay==this.lastDay){
    //  this.MonthEnd=true;
   if(localStorage.getItem("Submitted")){
      this.MonthEnd=true
    }
    if(this.currentDay==1){
      this.show=1;
    }

  }
  ngAfterViewInit(){
    console.log("afterinit");



  }





}

