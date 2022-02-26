
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthServicesService } from 'src/app/Auth/auth-services.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  shortLink: string = "";
    loading: boolean = false; // Flag variable
    file!: File;
    uploaded=false;


  constructor(private auth:AuthServicesService) { }

  onChange(event:any) {
    this.file = event.target.files[0];
    }

  ngOnInit(): void {
  }
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.auth.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event.link;

                this.loading = false; // Flag variable
                this.uploaded=true;
            }
        }
    );

}


}


