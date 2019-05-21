import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
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

  ngOnInit() {
  }
    public createTaskArray(): void {
    /* get jsonString, parse it into json object
    */
        var jsonString = this.title;
        var json = JSON.parse(jsonString);
        var array = [];
        for (var node of json) {
          array.push(node);
      }
        this.array = array;
      }
}
