import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  postRequestResponse: string;
  errorMessage: string;
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
  }
  public goToAccountCreation(): void {
    this.router.navigate(['./create-account']);
  }
  public authenticate(): void {
    var login = new Login(this.loginForm.get("username").value,this.loginForm.get("password").value);
    this.appService.authenticate(login).subscribe((data: any) => {
      if (data.isSuccess) {
        this.router.navigate(['./task-list']);
      }
      else {
        this.errorMessage = data.errorMessage;
      }
    });
  }
}
