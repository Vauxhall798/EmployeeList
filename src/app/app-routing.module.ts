import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { ListComponent } from './list/list/list.component';


const routes: Routes = [
  {path:'login',component:FormsComponent},
  {path:'list',loadChildren:()=>import('../app/list/list.module').then(m=>m.ListModule),component:ListComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
