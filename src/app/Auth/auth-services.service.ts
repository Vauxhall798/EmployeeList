import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, of, throwError } from 'rxjs';
import { Employees } from './employee';
import { UpdateEmp } from './Update';
import {map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  show:boolean=true;

  constructor(private http:HttpClient) { }

  url:string="http://localhost:3001/api/v1/employeedetails/empwithfeedback/"

  uploadUrl:string="http://localhost:3001/api/v1/employeedetails/upload"

  FeedUrl:string="http://localhost:3001/api/v1/employeefeedbacks/allfeedbacks"



  upload(file:any):Observable<any> {


    const formData = new FormData();


    formData.append("file", file, file.name);



    return this.http.post(this.uploadUrl, formData)
}

  updateEmployees(data:Employees[]){


  }


  getEmployees():Observable<Employees[]>{
    return this.http.get<Employees[]>(this.url)
  }

  getEmployeesWithFeedback(){
    return this.http.get<Employees[]>(this.FeedUrl)
  }

  getEmployeesWithEmpId(employeeid:string){
    return this.http.get<Employees>(`//localhost:3001/api/v1/employeedetails/employeeid/${employeeid}`)
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  login({ email, password,phone,name }: any): Observable<any> {
    if (email === 'vishaal351@gmail.com' && password === 'Vishwa@351' && phone=='9087492024' && name=='Vishaal') {
      this.setToken('abcdefghijklmnopqrstuvwxyz')
      return of({ name: 'Vishaal', email: 'vishaal351@gmail.com' });
    }
    return throwError(()=>new Error('Failed to login'));
  }
}
