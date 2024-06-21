import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl:'./error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnDestroy{
  timer:number = 5;
  sub:any;
  constructor(private _router:Router){
    this.sub=setInterval(() => {
      this.timer--;
      if(this.timer == 0){
        _router.navigateByUrl('/home');
      }
    }, 1000);
  }

  ngOnDestroy(): void {
      if(this.sub){
        clearInterval(this.sub);
      }
  }
}
