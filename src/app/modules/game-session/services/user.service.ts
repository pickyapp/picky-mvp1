import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";




@Injectable()
export class UserService {


  private readonly hostUrl = 'https://api.piky.me';

  constructor(private httpClient: HttpClient) {

  }

  setUsername(username: string, gameSession: string) {
    // FIXME: fix getting empty gameSession string
<<<<<<< HEAD
    var mkUserObs = this.httpClient.post(`${this.hostUrl}/game-sessions/${gameSession}/add-user`, {
=======
    var mkUserObs = this.httpClient.post(`https://api.piky.me/game-sessions/${gameSession}/add-user`, {
>>>>>>> f3c727f1bc4c48b4f7870277ef43f5ff64314a95
      username: username
    }, {
      observe: 'response',
      withCredentials: true // Required for CORS
    });
    return mkUserObs;
  }
}
