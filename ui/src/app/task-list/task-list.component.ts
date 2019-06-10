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
  jsonNode: string;
  postRequestResponse: string;
  array: any[];
  addTaskForm = new FormGroup({
    name: new FormControl(''),
  });
    constructor(private router: Router, private appService: AppService) {
    }

  ngOnInit() {
            this.appService.getTasks().subscribe(
              response => {
                this.jsonNode = JSON.stringify(response);
                this.createArray();
                })
  }
    public createArray() {
      console.log("createArray has been executed");
      var json = JSON.parse(this.jsonNode)
      var array = [];
                  for (var node of json) {
                    array.push(node);
                }
                  this.array = array;
    }
    public createTask() {
      console.log("creating task");

    this.appService.createTask(this.addTaskForm.get("name").value).subscribe((data: any) => {
        alert("json returned: " + data.content);
        this.array.push(JSON.parse(data.content));
      });
    }
    public logOut() {
    //send request to server to remove session
    //redirect to login page
      this.appService.sendLogOut().subscribe();
      this.router.navigate(['./login']);
    }
}
