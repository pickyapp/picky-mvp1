import { Component, OnInit } from "@angular/core";
import { RoomService } from "../../services/room.service";
import { NetworkRoomService } from "../../services/network-room.service";
import { take } from "rxjs/operators";




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
    let s = this.nRoomService.networkPipe(this.nRoomService.getUnseenCount())
      .subscribe(b => {
        this.roomService.setUnseenCount(b.unseenCount);
      });
  }

}
