import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

/**
 * Class representing application service.
 *
 * @class AppService.
 */
@Injectable()
export class AppService {
  private serviceUrl = '/api/getTestData';
  private dataPostTestUrl = '/api/postTest';

  constructor(private http: HttpClient) {
  }

  /**
   * Makes a http get request to retrieve the welcome message from the backend service.
   */
  public getWelcomeMessage() {
  console.log("getWelcomeMessage has started. Requesting url:" + this.serviceUrl);
    return this.http.get(this.serviceUrl).pipe(
      map(response => response)
    );
  }

  /**
   * Makes a http post request to send some data to backend & get response.
   */
  public sendData(): Observable<any> {
    return this.http.post(this.dataPostTestUrl, JSON.parse("[{\"id\":3,\"name\":\"task1\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/3\",\"updateLink\":\"http://localhost:9000/updateLink/3\",\"deleteLink\":\"http://localhost:9000/delete/3\"},{\"id\":4,\"name\":\"task2\",\"isTaskComplete\":true,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/4\",\"updateLink\":\"http://localhost:9000/updateLink/4\",\"deleteLink\":\"http://localhost:9000/delete/4\"},{\"id\":5,\"name\":\"task3\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/5\",\"updateLink\":\"http://localhost:9000/updateLink/5\",\"deleteLink\":\"http://localhost:9000/delete/5\"},{\"id\":6,\"name\":\"task4\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/6\",\"updateLink\":\"http://localhost:9000/updateLink/6\",\"deleteLink\":\"http://localhost:9000/delete/6\"}]")
);
  }
}
