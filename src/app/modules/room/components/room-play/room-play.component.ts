import { Component } from "@angular/core";
import { RoomService } from "../../services/room.service";




@Component({
  selector: "room-play",
  templateUrl: "room-play.component.html",
  styleUrls: ["room-play.component.scss"]
})

export class RoomPlayComponent {

  currUser: string;

  constructor(
    private roomService: RoomService
  ) {
    this.currUser = this.roomService.getCurrUser();
  }

}
