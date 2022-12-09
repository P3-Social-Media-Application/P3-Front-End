import { Component, OnInit } from '@angular/core';
import { DetailsModel } from 'src/app/models/my-details-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css']
})
export class MyDetailsComponent implements OnInit {

    user:DetailsModel = new DetailsModel("","","","")

  constructor(private userService:AuthService) { }

  ngOnInit(): void {
    this.userService.retrieveMyDetails().subscribe((data) => {
         if(data) {
           this.user = data;
          
         }
       })
  }

}