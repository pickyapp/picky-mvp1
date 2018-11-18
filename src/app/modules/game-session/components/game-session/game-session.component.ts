import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "../../types/user/user.interface";
import { SetUsername } from "../../store/user/user.actions";
import { getUserState } from "../../game-session.selectors";



@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent {

  private user$: Observable<User>;
  private usernameStr: String = "something";

  constructor(private store: Store<User>) {
    this.user$ = this.store.select(getUserState)
  }

  setUsername(val: String) {
    this.store.dispatch(new SetUsername(val));
  }
}

