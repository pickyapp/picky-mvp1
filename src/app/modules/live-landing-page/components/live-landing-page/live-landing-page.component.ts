import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppState } from "../../../../types/app-state/app-state.interface";

@Component({
  selector: "live-landing-page",
  templateUrl: "live-landing-page.component.html",
  styleUrls: ["live-landing-page.component.scss"]
})

export class LiveLandingPageComponent implements OnInit {

  private sessionPath: string = "/";
  sessionName: string = "";

  private step2Text: string;

  ngOnInit() {
    this.step2Text = `Share picky.me/g/${this.sessionName && this.sessionName !== "" ? this.sessionName : '<session>'} with your game buddy`;
  }

  constructor(
    private router: Router
  ) {}

  onSessionNameUpdate(updatedValue) {
    this.sessionName = updatedValue;
    this.sessionPath = `/live/${updatedValue}`;
    this.step2Text = `Share picky.me/g/${this.sessionName && this.sessionName !== "" ? this.sessionName : '<session>'} with your game buddy`;
  }

  setGameSessionAndUpdateRoute() {
    this.router.navigate([this.sessionPath]);
  }
}
