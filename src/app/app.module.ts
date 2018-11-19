
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RootRouting,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([AppEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
