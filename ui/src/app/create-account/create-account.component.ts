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
  postRequestResponse: string;
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
  }
  //on submit, send form to logincontroller
  //logincontroller determines if the username and password are valid choices
// if valid, route to tasklist component and display tasks
// if not valid, flash or something
    public onSubmit(): void {
      this.appService.sendData().subscribe((data: any) => {
        alert("here is how to send form data: " + this.loginForm.get("username").value);
        this.postRequestResponse = data.content;
        this.router.navigate(['./task-list']);
      });
    }
    public createAccount(): void {
      var login = new Login(this.loginForm.get("username").value,this.loginForm.get("password").value)
      this.appService.createAccount(login).subscribe((data: any) => {
        alert(data.content);
        });
        }
}
