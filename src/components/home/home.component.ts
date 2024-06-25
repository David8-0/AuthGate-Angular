import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

constructor(private _activatedRouter:ActivatedRoute){}
ngOnInit(): void {
    this._activatedRouter.fragment.subscribe((value)=>{
      this.jumpTo(value)
    })
}

jumpTo(section:string|null){
  if(section)
    document.getElementById(section)?.scrollIntoView({behavior:'smooth',block:'center'})
}

}
