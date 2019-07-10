import { Component } from "@angular/core";
import { take } from "rxjs/operators";
import { Router } from "@angular/router";
import { NetworkRoomService } from "../../services/network-room.service";


@Component({
  selector: "room-create",
  templateUrl: "room-create.component.html",
  styleUrls: ["room-create.component.scss"]
})

export class RoomCreateComponent {

  myName: string;
  friendName: string;
  private urlId: string;
  
  isRoomCreated: boolean;
  roomCreateBtnString: string;

  ngOnInit() {
    this.isRoomCreated = false;
    this.roomCreateBtnString = "Create Room";
  }

  constructor(
    private nRoomService: NetworkRoomService,
    private router: Router
  ) {
    this.urlId = "";
  }

  createRoom() {
    let currUrlId = (this.friendName + this.myName + '-' + this.getRandomString(16)).toLowerCase();
    let o = this.nRoomService.createRoom(currUrlId, [this.myName.toLowerCase(), this.friendName.toLowerCase()]);
    let s = o.pipe(
      take(1)
    ).subscribe(resp => {
      this.urlId = currUrlId;
      this.isRoomCreated = true;
      this.roomCreateBtnString = "Room created!"
      s.unsubscribe();
    });
    console.log(currUrlId);
  }

  getRandomString(length: number) {
    let text = "";
    const charset = "qwertyuiopasdfghjklzxcvbnm1234567890";
    for (let i = 0; i < length; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
  }

  enterRoom() {
    // TODO: enter room
    console.log("TODO: go to room.");
    this.router.navigate(['/room/'+this.urlId]);
  }
}
