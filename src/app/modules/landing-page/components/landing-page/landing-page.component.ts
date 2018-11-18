import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "landing-page",
  templateUrl: "landing-page.component.html",
  styleUrls: ["landing-page.component.scss"]
})

export class LandingPageComponent implements OnInit {

  private sessionPath: string = "/";
  private sessionName: string = "";

  private step2Text: string;

  ngOnInit() {
    this.step2Text = `Share picky.me/g/${this.sessionName && this.sessionName !== "" ? this.sessionName : '<session>'} with your game buddy`;
  }

  constructor(private router: Router) {}

  onSessionNameUpdate(updatedValue) {
    this.sessionName = updatedValue;
    this.sessionPath = `/g/${updatedValue}`;
    this.step2Text = `Share picky.me/g/${this.sessionName && this.sessionName !== "" ? this.sessionName : '<session>'} with your game buddy`;
  }
}
