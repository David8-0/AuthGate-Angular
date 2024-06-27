import { Component, OnInit,HostListener  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  currentScrollPosition: number = 0;

constructor(private _activatedRouter:ActivatedRoute){}
ngOnInit(): void {
    this._activatedRouter.fragment.subscribe((value)=>{
      this.jumpTo(value)
    })
}

jumpTo(section:string|null){
  if(section)
    document.getElementById(section)?.scrollIntoView({behavior:'smooth',block:'start'})
}
@HostListener('window:scroll', ['$event'])
onWindowScroll(event: Event): void {
  this.currentScrollPosition = window.scrollY;
  console.log('Current Scroll Position:', this.currentScrollPosition);
  // Apply your conditions based on scroll position here
  if (this.currentScrollPosition > 100) {
    // Apply condition if scroll position is greater than 100
  } else {
    // Apply condition if scroll position is less than or equal to 100
  }
}

scrollUp(){
  window
}

}
