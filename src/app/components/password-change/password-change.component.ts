import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PassModel } from 'src/app/models/pass-model';
import { ChangePassService } from 'src/app/services/change-pass.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  hide = true;
  empLogin : FormGroup;
  submitted = false;
  pwordModel = new PassModel("","");
  

  
   onSubmit(){
    if(this.empLogin.valid){
      this.pwordModel = this.empLogin.value; 
        
    console.log(this.pwordModel);
    this.passServ.change(this.empLogin.value)
    .subscribe(
    data =>{ 
      console.log(data.body)
      if(data.body == true){
      this.openSnackBarA()} else if (data.body == false)
      {this.openSnackBarB()}
    },
    

    )}
    else{
      console.log("Invalid Input")
    }
    
  } 

  openSnackBarA(){
    this._snackBar.open("Password Changed","Close",{duration:4000}),
    this.router.navigate(["/post-feed"])
    
  }
  openSnackBarB(){
    this._snackBar.open("Error, Incorrect Current Password","Close", {duration:4000})
    this.router.navigate(["/post-feed"])
  }
  
  constructor(public formBuilder: FormBuilder, 
    private router : Router,
    private passServ : ChangePassService,
    private _snackBar: MatSnackBar){
    
    this.empLogin = this.formBuilder.group({
      oldPass: ["",[Validators.required]],
      newPass: ["",[Validators.required]]
    })
  }

  ngOnInit(): void {
   

}
}