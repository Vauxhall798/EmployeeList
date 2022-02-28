import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MatSidenav)
 sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver,private router:Router) { }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  ngOnInit(): void {
  }

  feedback(){
   this.router.navigate(['/list/feedback'])
  }
  resouces(){
    this.router.navigate(['/list/resources'])
  }
  employers(){
    this.router.navigate(['/list/employee'])
  }
  logout(){
    localStorage.removeItem('locked');
    localStorage.removeItem('Submitted');

    this.router.navigate(['/login'])
  }

}
