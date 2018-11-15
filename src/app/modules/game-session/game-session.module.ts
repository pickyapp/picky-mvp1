import { NgModule } from "@angular/core";
import { GameSessionComponent } from "./components/game-session.component";
import { gameSessionRouting } from "./game-session-routing.module";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "./store/user/user.reducer";
import { UiModule } from "../ui/ui.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    GameSessionComponent
  ],
  imports: [
    CommonModule,
    gameSessionRouting,
    StoreModule.forFeature('gameSession', {
      user: userReducer
    }),
    UiModule,
  ]
})

export class GameSessionModule { }

