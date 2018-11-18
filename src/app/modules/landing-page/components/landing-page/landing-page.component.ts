import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "landing-page",
  templateUrl: "landing-page.component.html",
  styleUrls: ["landing-page.component.scss"]
})

export class LandingPageComponent implements OnInit {

  private sessionPath: String = "/";
  private sessionName: String = "";

  private step2Text: String;

  ngOnInit() {
    this.step2Text = `Share picky.me/g/${this.sessionName && this.sessionName !== "" ? this.sessionName : '<session>'} with your game buddy`;
  }

  constructor(private router: Router) {}

  onSessionNameUpdate(updatedValue) {
    this.sessionName = updatedValue;
    this.sessionPath = `/g/${updatedValue}`;
    this.step2Text = `Share picky.me/g/${this.sessionName && this.sessionName !== "" ? this.sessionName : '<session>'} with your game buddy`;
  }

  didClick(e) {
    console.log(e);

  }
}
