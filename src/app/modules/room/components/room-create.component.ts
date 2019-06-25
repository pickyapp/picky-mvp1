import { Component } from "@angular/core";
import { RoomService } from "../services/room.service";
import { take } from "rxjs/operators";


@Component({
  selector: "room-create",
  templateUrl: "room-create.component.html",
  styleUrls: ["room-create.component.scss"]
})

export class RoomCreateComponent {

  private myName: string;
  private friendName: string;

  constructor(
    private roomService: RoomService
  ) {

  }

  createRoom() {
    let urlId = (this.friendName + this.myName + '-' + this.getRandomString(16)).toLowerCase();
    let o = this.roomService.createRoom(urlId, [this.myName.toLowerCase(), this.friendName.toLowerCase()]);
    let s = o.pipe(
      take(1)
    ).subscribe(resp => {
      console.log(resp.body);
      s.unsubscribe();
    });
    console.log(urlId);
  }

  getRandomString(length: number) {
    let text = "";
    const charset = "qwertyuiopasdfghjklzxcvbnm1234567890";
    for (let i = 0; i < length; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
  }
}
