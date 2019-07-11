import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { RoomUser } from "../types/room-user.interface";
import { Room } from "../types/room.interface";
import { createRoom, populateRoom } from '../types/room.functions';
import { createRoomUser } from "../types/room-user.functions";




@Injectable()
export class RoomService {

  private currUser: RoomUser;
  private currRoom: Room;
  private currentQuesRoom;


  constructor() {
    this.currUser = createRoomUser();
  }

  populateRoom(body: any) {
    this.currRoom = populateRoom(this.currRoom, body.urlId, body.users);
  }

  createRoom() {
    this.currRoom = createRoom();
  }

  setCurrUserUsername(user: string) {
    this.currUser.username = user;
  }

  getCurrUserUsername(): string {
    return this.currUser.username;
  }

  getBuddyName(): string {
    const name = this.currRoom.users.filter(u => u !== this.getCurrUserUsername())[0];
    return name.charAt(0).toUpperCase() + name.substr(1);
  }

  getBuddyAnswerIndex(): number {
    return this.currentQuesRoom.users.filter(u => u.username !== this.getCurrUserUsername())[0].answerIndex;
  }

  getUrlId(): string {
    return this.currRoom.urlId;
  }

  getUsers(): string[] {
    return this.currRoom.users;
  }

  setUnseenCount(count: number) {
    this.currUser.unseenCount = count;
  }

  getUnseenCount(): number {
    return this.currUser.unseenCount;
  }

  setCurrQuesRoom(quesroom) {
    this.currentQuesRoom = quesroom;
  }

  getCurrQuesRoom() {
    return this.currentQuesRoom;
  }

  decrementUnseenCount() {
    this.currUser.unseenCount--;
  }
}