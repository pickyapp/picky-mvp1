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

  getUrlId(): string {
    return this.currRoom.urlId;
  }

  getUsers(): string[] {
    return this.currRoom.users;
  }
}