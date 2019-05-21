import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

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
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
  }
    public onSubmit(): void {
      this.appService.sendData().subscribe((data: any) => {
        this.postRequestResponse = data.content;
        this.router.navigate(['./task-list']);
      });
    }
}
