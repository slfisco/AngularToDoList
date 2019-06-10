import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { Login } from './login';

/**
 * Class representing application service.
 *
 * @class AppService.
 */
@Injectable()
export class AppService {
  private getTasksUrl = '/api/getTasks';
  private loginUrl = '/api/authenticate';
  private createAccountUrl = '/api/createAccount';
  private createTaskUrl = '/api/createTask';
  private deleteTaskUrl = '/api/deleteTask';
  private updateStatusUrl = '/api/updateStatus';
  private getTaskUrl = '/api/getTask';
  private logOutUrl = '/api/logOut';


  constructor(private http: HttpClient) {
  }

  public getTasks(): Observable<any> {
    return this.http.get(this.getTasksUrl).pipe(map(response=> response));
  }
  public authenticate(login: Login): Observable<any> {
    var jsonString = JSON.stringify(login);
    return this.http.post(this.loginUrl, JSON.parse(jsonString));
  }
  public createAccount(login: Login): Observable<any> {
    var jsonString = JSON.stringify(login);
    return this.http.post(this.createAccountUrl, JSON.parse(jsonString));
  }
  public createTask(taskName: string): Observable<any> {
    var jsonString = '{\"name\":' + '"' + taskName + '"}'
    alert(jsonString);
    return this.http.post(this.createTaskUrl, JSON.parse(jsonString));
    }
  public deleteTask(id: number): Observable<any> {
    //delete based on id in URL
    return this.http.delete(this.deleteTaskUrl + "/"  + id);
  }
  public updateStatus(json): Observable<any> {
        alert(JSON.stringify(json));
        return this.http.put(this.updateStatusUrl, json);
    }
  public sendLogOut(): Observable<any> {
    return this.http.get(this.logOutUrl);
    }
}
