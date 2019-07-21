import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomService } from "../../services/room.service";
import { Room } from "../../types/room.interface";
import { createRoom, populateRoom } from "../../types/room.functions";
import { take, switchMap, map, tap } from "rxjs/operators";
import { NetworkRoomService } from "../../services/network-room.service";
import { environment } from '../../../../../environments/environment';
import { timer } from "rxjs";


@Component({
  selector: "room",
  templateUrl: "room.component.html",
  styleUrls: ["room.component.scss"]
})

export class RoomComponent {

  copyUrlBtnText: string;
  showTip: boolean;

  buddyName: string;


  constructor(
    public roomService: RoomService,
    private nRoomService: NetworkRoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roomService.createRoom();
  }

  ngOnInit() {
    this.showTip = true;
    this.copyUrlBtnText = "Copy URL";
    this.buddyName = "";
    let routeSubs = this.route.params.pipe( // TODO: cleanup this flow
      take(1),
      switchMap(params => this.nRoomService.getRoom(params["urlId"], this.roomService.getCurrentDate())),
      map(resp => resp.body),
      tap(b => {
        this.roomService.populateRoom(b);
        this.buddyName = this.roomService.getBuddyName();
        this.showTip = !this.roomService.getCommonTipIsSeen(0);
      }),
      switchMap(resp => this.nRoomService.updateRoomDate()),
      switchMap(resp => this.nRoomService.getRoom(this.roomService.getUrlId(), this.roomService.getCurrentDate())),
      map(resp => resp.body),
      tap(b => this.roomService.populateRoom(b)),
      switchMap(b => this.nRoomService.networkPipe(this.nRoomService.updateRoomDate())),
      map(resp => resp.body),
    ).subscribe(b => {
      routeSubs.unsubscribe();
    });
  }

  authAs(username: string) {
    this.roomService.setCurrUserUsername(username);
    this.router.navigate(['/room/'+this.roomService.getUrlId()+"/play"]);
  }

  copyUrl() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = environment.domain + this.router.url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copyUrlBtnText = "Copied!";
    let s = timer(500).pipe(take(1)).subscribe(e => {
      this.showTip = false;
      s.unsubscribe();
    });
  }
}
