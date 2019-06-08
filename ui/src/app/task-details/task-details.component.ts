import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  show: boolean = true;
  @Input() task: object;
  constructor(private appService: AppService) { }

  ngOnInit() {
  }
  public changeStatus(): void {
//http request to change status
  var jsonString = JSON.stringify(this.task);
  var jsonNode = JSON.parse(jsonString);
    this.appService.updateStatus(jsonNode).subscribe((data: any) => {
          alert(data.content);
          });
     alert("task status changed");
  }
  public deleteTask(): void {
//http request to delete task
  var jsonString = JSON.stringify(this.task);
  var jsonNode = JSON.parse(jsonString);
    this.appService.deleteTask(jsonNode.id).subscribe((data: any) => {
        alert(data.content);
      });
    alert("task deleted");
    this.show = !this.show;
  }
}
