import { Component } from '@angular/core';

import { AppService } from './app.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  postRequestResponse: string;
  array: any[];
  name = new FormControl('');

  constructor(private router: Router, private appService: AppService) {
    this.appService.getWelcomeMessage().subscribe((data: any) => {
      this.title = data.content;
      var json = JSON.parse(data.content);
    });
  }

  /**
   * This method is used to test the post request
   */
  public postData(): void {
    this.appService.sendData().subscribe((data: any) => {
      this.postRequestResponse = data.content;
    });
  }
  public createTaskArray(): void {
  // get jsonString, parse it into json object
      var jsonString = this.title;
      var json = JSON.parse(jsonString);
      var array = [];
      for (var node of json) {
        array.push(node);
    }
      this.array = array;
    }
    public updateName() {
      this.name.setValue('test');
      this.router.navigate(['/login']);
      }
}
