
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './components/app/app.component';
import { FormsModule } from '@angular/forms';
import { RootRouting } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { GameSessionEffects } from "./store/game-session/game-session.effects";
import { gameSessionReducer } from './store/game-session/game-session.reducer';
import { GameSessionService } from './services/game-session.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([
      GameSessionEffects
    ]),
    FormsModule,
    HttpClientModule,
    RootRouting,
    StoreModule.forRoot({
      gameSession: gameSessionReducer
    }),
    EffectsModule.forRoot([
      AppEffects,
      GameSessionEffects
    ])
  ],
  providers: [ GameSessionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
