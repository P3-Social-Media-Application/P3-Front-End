import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  
  errorMessage:String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(e: any): void {
    e.preventDefault()
    this.authService.login(this.loginForm.value.email || "", this.loginForm.value.password || "")
      .subscribe(
        (response) => {
          this.authService.currentUser = response.body
          this.router.navigate(['post-feed'])
        },(error)=>{this.errorMessage = "Invalid Credentials"}
      )
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
