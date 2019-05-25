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

  constructor(private router: Router, private appService: AppService) {
  }

  /*
    public updateName() {
      this.name.setValue('test');
      this.router.navigate(['/login']);
      }
      */
}
