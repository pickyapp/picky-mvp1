import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class GameSessionService {

  constructor(
    private http: HttpClient,
  ) {}

  getSessionAt(gameSessionName: string): Observable<any> { // TODO: change from any
    return this.http.get(`http://localhost:9000/game-sessions/${gameSessionName}`, {
      observe: 'response',
      withCredentials: true
    });
  }

  makeSession(gameSessionName: string): Observable<any> {
    var mkSessReq = this.http.post(`http://localhost:9000/game-sessions/make/${gameSessionName}`, {}, {
      observe: 'response',
      withCredentials: true // Required for CORS
    });
    return mkSessReq;
  }
}