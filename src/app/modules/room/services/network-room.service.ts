import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { RoomService } from "./room.service";
import { filter, take, map } from 'rxjs/operators';






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

  getQuestion(): Observable<any> {
    return this.http.get(`${this.hostUrl}/rooms/${this.roomService.getUrlId()}/${this.roomService.getCurrUserUsername()}/question`, this.httpOptions);
  }

  postAnswer(answerIndex: number): Observable<any> {
    return this.http.post(`${this.hostUrl}/rooms/question/${this.roomService.getCurrQuesRoom()._id}`, {
      answerIndex,
      username: this.roomService.getCurrUserUsername()
    }, this.httpOptions);
  }

  getAnswer(): Observable<any> {
    return this.http.get(`${this.hostUrl}/rooms/${this.roomService.getUrlId()}/${this.roomService.getCurrUserUsername()}/answer`, this.httpOptions);
  }

  networkPipe(o: Observable<any>): Observable<any> {
    return o.pipe(
      filter(resp => resp.body.message === "success"),
      take(1),
      map(resp => resp.body)
    );
  }

}