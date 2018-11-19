import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "../../types/user/user.interface";
import { SetUsername } from "../../store/user/user.actions";
import { getUserState } from "../../game-session.selectors";
import { GetServerGameSession } from "../../store/game-session/game-session.actions";



@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent {

  private user$: Observable<User>;
  private usernameStr: string = "something";

  constructor(private store: Store<User>) {
    this.user$ = this.store.select(getUserState)
    this.store.dispatch(new GetServerGameSession("asdf"));
  }

  setUsername(val: string) {
    this.store.dispatch(new SetUsername(val));
  }
}

