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

  getRoom(urlId: string, date: string): Observable<any> {
    return this.http.get(`${this.hostUrl}/rooms/${urlId}/${date}`, this.httpOptions);
  }
  
  getUnseenCount(username: string): Observable<any> {
    return this.http.get(`${this.hostUrl}/rooms/${this.roomService.getUrlId()}/${username}/unseencount`, this.httpOptions);
  }

  getQuestion(): Observable<any> {
    console.log("DATE: ", this.roomService.getCurrentDate());
    return this.http.get(`${this.hostUrl}/rooms/${this.roomService.getUrlId()}/${this.roomService.getCurrUserUsername()}/${this.roomService.getCurrentDate()}/question`, this.httpOptions);
  }

  getUnansweredQuestionAmount(): Observable<any> {
    return this.http.get(`${this.hostUrl}/rooms/${this.roomService.getUrlId()}/${this.roomService.getCurrUserUsername()}/${this.roomService.getCurrentDate()}/questions/unanswered-amount`, this.httpOptions);
  }

  updateRoomDate(): Observable<any> {
    return this.http.post(`${this.hostUrl}/rooms/${this.roomService.getUrlId()}/${this.roomService.getCurrentDate()}/update-date`, {}, this.httpOptions);
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

  postTipSeen(tipIndex: number): Observable<any> {
    return this.http.post(`${this.hostUrl}/rooms/${this.roomService.getUrlId()}/${this.roomService.getCurrUserUsername()}/tip-seen`, {
      tipIndex
    }, this.httpOptions);
  }

  networkPipe(o: Observable<any>): Observable<any> {
    return o.pipe(
      take(1),
      map(resp => resp.body)
    );
  }

}