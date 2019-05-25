import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  addTaskForm = new FormGroup({
    name: new FormControl(''),
  });
    constructor(private router: Router, private appService: AppService) {
    }

  ngOnInit() {
        //on init, get observable of testService. on response, set title to response.content and run createArray
            this.appService.testService().subscribe(
              response => {
                this.title = response.content;
                this.createArray();
                })
  }
    public createArray() {
      console.log("createArray has been executed");
      var json = JSON.parse(this.title)
      var array = [];
                  for (var node of json) {
                    array.push(node);
                }
                  this.array = array;
    }
    public createTask() {
      console.log("creating task");
      //send request to database
      //push response to array

      //fake for now
      var json = JSON.parse("{\"id\":3,\"name\":\"task1\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/3\",\"updateLink\":\"http://localhost:9000/updateLink/3\",\"deleteLink\":\"http://localhost:9000/delete/3\"}")
      this.array.push(json);
    }
}
