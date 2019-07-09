import { Component } from "@angular/core";
import { RoomService } from "../../services/room.service";
import { take } from "rxjs/operators";
import { Router } from "@angular/router";


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
  private roomCreateBtnString: string;

  ngOnInit() {
    this.isRoomCreated = false;
    this.roomCreateBtnString = "Create Room";
  }

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {
    this.urlId = "";
  }

  createRoom() {
    let currUrlId = (this.friendName + this.myName + '-' + this.getRandomString(16)).toLowerCase();
    let o = this.roomService.createRoom(currUrlId, [this.myName.toLowerCase(), this.friendName.toLowerCase()]);
    let s = o.pipe(
      take(1)
    ).subscribe(resp => {
      console.log(resp.body);
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
