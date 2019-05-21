import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  show: boolean = true;
  @Input() task: object;
  constructor() { }

  ngOnInit() {
  }
  public changeStatus(): void {
//http request to change status
    alert("checkbox status changed");
  }
  public deleteTask(): void {
//http request to delete task
    alert("task deleted");
    this.show = !this.show;
  }
}
