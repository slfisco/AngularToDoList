import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

/**
 * Class representing application service.
 *
 * @class AppService.
 */
@Injectable()
export class AppService {
  private serviceUrl = '/summary';

  constructor(private http: HttpClient) {
  }

  /**
   * Makes a http get request to retrieve the welcome message.
   */
  public getWelcomeMessage() {
    return this.http.get(this.serviceUrl)
      .map(response => response)
  }
}
