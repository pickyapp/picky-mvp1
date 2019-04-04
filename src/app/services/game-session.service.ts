import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class GameSessionService {

  private httpOptions: object = {
    observe: 'response',
    withCredentials: true // Required for CORS
  };

  constructor(
    private http: HttpClient,
  ) {}

  getSessionAt(gameSessionName: string): Observable<any> { // TODO: change from any
    return this.http.get(`http://localhost:9000/game-sessions/${gameSessionName}`, this.httpOptions);
  }

  makeSession(gameSessionName: string): Observable<any> {
    var mkSessReq = this.http.post(`http://localhost:9000/game-sessions/make/${gameSessionName}`, {}, this.httpOptions);
    return mkSessReq;
  }

  getQuestion(): Observable<any> {
    return this.http.get(`http://localhost:9000/game-sessions/random`, this.httpOptions);
  }

  postMyAnswer(ans: string): Observable<any> {
    return this.http.post(`http://localhost:9000/game-sessions/random`, {}, this.httpOptions);
  }

  getBuddyAnswer(): Observable<any> {
    return this.http.get(`http://localhost:9000/game-sessions/random`, this.httpOptions);
  }
}
