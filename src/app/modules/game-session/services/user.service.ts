import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";




@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {

  }

  setUsername(username: string, gameSession: string) {
    // FIXME: fix getting empty gameSession string
    var mkUserObs = this.httpClient.post(`http://localhost:9000/game-sessions/SESSION_NAME_GOES_HERE/add-user`, {
      username: username
    }, {
      observe: 'response',
      withCredentials: true // Required for CORS
    });
    return mkUserObs;
  }
}
