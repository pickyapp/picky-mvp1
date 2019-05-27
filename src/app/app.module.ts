
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './components/app/app.component';
import { FormsModule } from '@angular/forms';
import { RootRouting } from './app-routing.module';
import { GameSessionService } from './services/game-session.service';
import { CookieService } from "ngx-cookie-service";
import { AboutUsComponent } from './modules/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RootRouting
  ],
  providers: [ GameSessionService, CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
