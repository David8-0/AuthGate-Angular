import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule,CodeComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Input() headers:string[]=[];
  @Input()  contents:string[] = [];
  
  currentIndex:number = 0;


  setIhndex(index:number){
    this.currentIndex = index;
  }
}
