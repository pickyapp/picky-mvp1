import { Component, Input } from "@angular/core";



@Component({
  selector: "header2",
  templateUrl: "./header2.component.html",
  styleUrls: [ "./header2.component.scss" ]
})

export class Header2Component {

  @Input("headerText") private  headerText: String;

  constructor( ) {}
}
