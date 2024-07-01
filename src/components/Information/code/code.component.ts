import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-code',
  standalone: true,
  imports: [],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  @Input() code: string="";
  isCopied: boolean = false;
  sub:any ;
  copyCode(){
    navigator.clipboard.writeText(this.code);
    this.isCopied = true;
    this.sub = setTimeout(()=>{
      this.isCopied = false;
    },2000)
    this.sub.unsbscribe();
  }


}
