import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";




@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {

  }

  setUsername(username: string, gameSession: string) {
    return this.httpClient.post(`http://localhost:9000/game-sessions/${gameSession}/add-user`, {
      username: username
    });
  }
}
