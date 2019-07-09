import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomService } from "../../services/room.service";
import { Room } from "../../types/room.interface";
import { createRoom, populateRoom } from "../../types/room.functions";
import { take, switchMap, map } from "rxjs/operators";







@Component({
  selector: "room",
  templateUrl: "room.component.html",
  styleUrls: ["room.component.scss"]
})

export class RoomComponent {

  roomData: Room;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roomData = createRoom();
    this.roomData.urlId = this.route.snapshot.params["urlId"];
  }

  ngOnInit() {
    let routeSubs = this.route.params.pipe(
      take(1),
      switchMap(params => this.roomService.getRoom(params["urlId"])),
      map(resp => resp.body)
    ).subscribe(b => {
      this.roomData = populateRoom(this.roomData, b.urlId, b.users);
      routeSubs.unsubscribe();
    });
  }

  authAs(user: string) {
    this.roomService.setCurrUser(user);
    this.router.navigate(['/room/'+this.roomData.urlId+"/play"]);
  }
}
