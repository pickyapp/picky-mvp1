import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GameSession } from "./types/game-session/game-session.interface";

@Injectable()
export class GameSessionService {
  constructor(private http: HttpClient) {}

  getSessionAt(gameSessionName: String): Observable<any> { // TODO: change from any
    console.log("asdf");
    return this.http.get(`http://localhost:9000/game-sessions/${gameSessionName}`);
  }

}