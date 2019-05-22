import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";




@Injectable()
export class UserService {


  private readonly hostUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {

  }

  setUsername(username: string, gameSession: string) {
    // FIXME: fix getting empty gameSession string
    var mkUserObs = this.httpClient.post(`${this.hostUrl}/game-sessions/${gameSession}/add-user`, {
      username: username
    }, {
      observe: 'response',
      withCredentials: true // Required for CORS
    });
    return mkUserObs;
  }
}
