import { NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatDividerModule} from '@angular/material/divider';
import { FeedbackComponent } from './feedback/feedback.component';
import { ResourcesComponent } from './resources/resources.component';
import { EmployeeComponent } from './employee/employee.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServicesService } from '../Auth/auth-services.service';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {CookieService} from 'ngx-cookie-service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import { SortDirective } from '../Auth/sort.directive';


export const listRoutes:Routes=[
  {path:'list',component:ListComponent,children:[
    {path:'feedback',component:FeedbackComponent},
    {path:'resources',component:ResourcesComponent},
    {path:'employee',component:EmployeeComponent},
    {path:'list',redirectTo:'/list/feedback',pathMatch:'full'}
  ]}
]

@NgModule({
  declarations: [
    ListComponent,
    FeedbackComponent,
    ResourcesComponent,
    EmployeeComponent,
    SortDirective,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(listRoutes),
    Ng2SearchPipeModule,

    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,

  ],
  providers:[AuthServicesService,CookieService]
})
export class ListModule implements OnDestroy{

  ngOnDestroy(): void {
      localStorage.clear();
      console.log("Cleared");
  }

}
