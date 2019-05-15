import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";




@Injectable()
export class UserService {


  private readonly hostUrl = 'https://api.piky.me';

  constructor(private httpClient: HttpClient) {

  }

  setUsername(username: string, gameSession: string) {
    // FIXME: fix getting empty gameSession string
    var mkUserObs = this.httpClient.post(`https://api.piky.me/game-sessions/${gameSession}/add-user`, {
      username: username
    }, {
      observe: 'response',
      withCredentials: true // Required for CORS
    });
    return mkUserObs;
  }
}
