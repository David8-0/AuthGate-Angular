import { Component, OnInit,HostListener, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('animatedDiv') animatedDiv!: QueryList<ElementRef>;
  showArrowUp: boolean = false;
  currentScrollPosition: number = 0;

constructor(
  private _activatedRouter:ActivatedRoute,
  private _router: Router,
  
){}
ngOnInit(): void {
    this._activatedRouter.fragment.subscribe((value)=>{
      this.jumpTo(value);
      const urlTree = this._router.parseUrl(this._router.url);
      urlTree.fragment=null;
      this._router.navigateByUrl(urlTree);
    })

    
}

ngAfterViewInit():void{
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target)
      } else {
        entry.target.classList.remove('visible');
      }
    });
  });

    this.animatedDiv.forEach(el=>{
      observer.observe(el.nativeElement);
    });
}

jumpTo(section:string|null){
  if(section)
    document.getElementById(section)?.scrollIntoView({behavior:'smooth',block:'start'})
}

@HostListener('window:scroll', ['$event'])
onWindowScroll(event: Event): void {
  this.currentScrollPosition = window.scrollY;
  if (this.currentScrollPosition > 200) {
      this.showArrowUp=true;
  } else {
   this.showArrowUp = false;
  }
}



}
