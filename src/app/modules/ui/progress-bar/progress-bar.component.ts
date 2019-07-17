import { Component, Input } from "@angular/core";



@Component({
  selector: 'progress-bar',
  templateUrl: "progress-bar.component.html",
  styleUrls: [ "progress-bar.component.scss" ]
})

export class ProgressBarComponent {

  @Input('progress') progress: number;
  @Input('total') total: number;
  
  bg: string = "linear-gradient(-45deg, #0026ca, #000)"
  
  constructor() {

  }

  ngOnChanges() {
    const progBar = document.getElementById('progress-bar');
    progBar.style.width = ((this.progress / this.total) * 100) + '%';
    if (this.progress === this.total) {
      this.bg = "linear-gradient(-45deg, #00e676, #00e676)"
    } else {
      this.bg = "linear-gradient(-45deg, #0026ca, #000)"
    }
  }


}