import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class GameSessionService {

  private readonly hostUrl = 'http://localhost:4200'; // 'https://pickystaging.herokuapp.com';

  private httpOptions: object = {
    observe: 'response',
    withCredentials: true // Required for CORS
  };

  constructor(
    private http: HttpClient,
  ) {}

  getSessionAt(gameSessionName: string): Observable<any> { // TODO: change from any
    return this.http.get(`${this.hostUrl}/game-sessions/${gameSessionName}`, this.httpOptions);
  }

  makeSession(gameSessionName: string): Observable<any> {
    var mkSessReq = this.http.post(`${this.hostUrl}/game-sessions/make/${gameSessionName}`, {}, this.httpOptions);
    return mkSessReq;
  }

  getQuestion(): Observable<any> {
    return this.http.get(`${this.hostUrl}/questions/random`, this.httpOptions);
  }

  postMyAnswer(i: number): Observable<any> {
    return this.http.post(`${this.hostUrl}/questions/answer`, {
      answerIndex: i
    }, this.httpOptions);
  }

  getBuddyAnswer(): Observable<any> {
    return this.http.get(`${this.hostUrl}/questions/answer`, this.httpOptions);
  }
}
