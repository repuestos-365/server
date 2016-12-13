import {
  Component,
  OnInit,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {bgConfig} from './bgConfig';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger("fadeInOut", [
      state("open", style({opacity: 1})),
      state("closed", style({opacity: 0.5})),
      transition("open <=> closed", animate( "10000ms" )),
    ])
  ]
})
export class WelcomeComponent implements OnInit {
  state = 'open';
  bgImages:any = bgConfig;
  fna:number;
  bgImage:any;
  constructor() {
     
    //console.log(this.bgImage);
  }

  ngOnInit() {
    this.fna = this.bgImages.length - 1;
    this.bgImage = this.bgImages[this.fna];
    let i = 0;
    let timer = Observable.timer(10000,5000);
    timer.subscribe(t=> {
      this.state = this.state === 'open' ? 'closed' : 'open';
      this.bgImage = this.bgImages[i];
      //console.log(this.bgImage);
      //console.log(this.state);
      i++;
      if(i > 4){
        i = 0;
      }
    });
  }

}
