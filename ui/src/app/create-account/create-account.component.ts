import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Login } from '../login';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  errorMessage: string;
  postRequestResponse: string;
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
  }
    public createAccount(): void {
      var login = new Login(this.loginForm.get("username").value,this.loginForm.get("password").value)
      this.appService.createAccount(login).subscribe((data: any) => {
        if (data.isSuccess) {
                  this.router.navigate(['./task-list']);
                }
                else {
                  this.errorMessage = data.errorMessage;
                };
        });
        }
}
