import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomService } from "../../services/room.service";
import { Room } from "../../types/room.interface";
import { createRoom, populateRoom } from "../../types/room.functions";
import { take, switchMap, map } from "rxjs/operators";
import { NetworkRoomService } from "../../services/network-room.service";







@Component({
  selector: "room",
  templateUrl: "room.component.html",
  styleUrls: ["room.component.scss"]
})

export class RoomComponent {

  constructor(
    public roomService: RoomService,
    private nRoomService: NetworkRoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roomService.createRoom();
  }

  ngOnInit() {
    let routeSubs = this.route.params.pipe(
      take(1),
      switchMap(params => this.nRoomService.getRoom(params["urlId"])),
      map(resp => resp.body)
    ).subscribe(b => {
      this.roomService.populateRoom(b);
      routeSubs.unsubscribe();
    });
  }

  authAs(username: string) {
    this.roomService.setCurrUserUsername(username);
    this.router.navigate(['/room/'+this.roomService.getUrlId()+"/play"]);
  }
}
