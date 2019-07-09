import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { RoomUser } from "../../game-session/types/user/user.interface";
import { RoomService } from "./room.service";






@Injectable()
export class NetworkRoomService {

  private readonly hostUrl = environment.apiUrl;
  private httpOptions: object = {
    observe: 'response',
    withCredentials: true // Required for CORS
  };
  
  constructor(
    private http: HttpClient,
    private roomService: RoomService
  ) {}

  createRoom(urlId, users): Observable<any> {
    return this.http.post(`${this.hostUrl}/rooms/create`, {
      urlId,
      users
    }, this.httpOptions);
  }

  getRoom(urlId: string): Observable<any> {
    return this.http.get(`${this.hostUrl}/rooms/${urlId}`, this.httpOptions);
  }
  
  getUnseenCount(): Observable<any> {
    return this.http.get(`${this.hostUrl}/rooms/${this.roomService.getUrlId()}/${this.roomService.getCurrUserUsername()}/unseencount`, this.httpOptions);
  }

}