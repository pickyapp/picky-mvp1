import { Component, Input } from "@angular/core";



@Component({
  selector: "anchor",
  templateUrl: "anchor.component.html",
  styleUrls: [ "anchor.component.scss" ]
})

export class AnchorComponent {
  
  @Input("text") private text: String;
}
