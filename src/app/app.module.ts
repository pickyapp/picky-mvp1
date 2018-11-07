import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { FormsModule } from '@angular/forms';
import { HomepageModule } from './modules/homepage/homepage.module';
import { RootRouting } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HomepageModule,
    RootRouting
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
