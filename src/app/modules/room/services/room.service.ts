import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";




@Injectable()
export class RoomService {

  private readonly hostUrl = environment.apiUrl;

  private currUser: string;

  private httpOptions: object = {
    observe: 'response',
    withCredentials: true // Required for CORS
  };


  constructor(
    private http: HttpClient
  ) {

  }

  createRoom(urlId, users): Observable<any> {
    return this.http.post(`${this.hostUrl}/rooms/create`, {
      urlId,
      users
    }, this.httpOptions);
  }

  getRoom(urlId: string): Observable<any> {
    return this.http.get(`${this.hostUrl}/rooms/${urlId}`, this.httpOptions);
  }

  setCurrUser(user: string) {
    this.currUser = user;
  }

  getCurrUser(): string {
    return this.currUser;
  }
}