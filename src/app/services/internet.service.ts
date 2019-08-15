
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class InternetService {
  
  protected readonly hostUrl = environment.apiUrl;
  protected readonly httpOptions: object = {
    observe: 'response',
    withCredentials: true // Required for CORS
  };
  protected httpClient: HttpClient;
  
  constructor(theHttpClient: HttpClient) {
    this.httpClient = theHttpClient;
  }

  nPipe(o: Observable<any>): Observable<any> {
    return o.pipe(
      take(1),
      map(resp => resp.body)
    );
  }
}