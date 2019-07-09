import { Component, OnInit } from "@angular/core";
import { RoomService } from "../../services/room.service";
import { NetworkRoomService } from "../../services/network-room.service";




@Component({
  selector: "room-play",
  templateUrl: "room-play.component.html",
  styleUrls: ["room-play.component.scss"]
})

export class RoomPlayComponent implements OnInit {

  currUsername: string;

  constructor(
    private roomService: RoomService,
    private nRoomService: NetworkRoomService
  ) {
    this.currUsername = this.roomService.getCurrUserUsername();
  }

  ngOnInit() {
    this.nRoomService.getUnseenCount().pipe(

    )
  }

}
