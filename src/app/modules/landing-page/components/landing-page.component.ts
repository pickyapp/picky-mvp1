import { Component, OnInit } from "@angular/core";



@Component({
  selector: "landing-page",
  templateUrl: "landing-page.component.html",
  styleUrls: ["landing-page.component.scss"]
})

export class LandingPageComponent implements OnInit {

  private newFullNameValue: String = "";
  private newUsernameValue: String = "";
  private newPhoneValue: String = "";

  private sessionPath: String = "/";
  private sessionName: String = "";

  ngOnInit() {}
}
