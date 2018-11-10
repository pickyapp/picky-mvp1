import { Component, OnInit } from "@angular/core";



@Component({
  selector: "homepage",
  templateUrl: "homepage.component.html",
  styleUrls: ["homepage.component.scss"]
})

export class HomepageComponent implements OnInit {

  private newFullNameValue: String = "";
  private newUsernameValue: String = "";
  private newPhoneValue: String = "";
  
  ngOnInit() {

  }
}
