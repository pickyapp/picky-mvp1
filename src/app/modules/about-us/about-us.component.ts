import { Component } from "@angular/core";
import Parallax from 'parallax-js';


@Component({
  selector: 'about-us',
  templateUrl: 'about-us.component.html',
  styleUrls: ['about-us.component.scss']
})

export class AboutUsComponent {

  constructor() {
  }

  ngOnInit() {
    var scene = document.getElementById('pscene');
    var parallaxInstance = new Parallax(scene);
  }
}
