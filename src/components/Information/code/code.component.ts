import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  @Input() code: string="";



  copyCode(){
    navigator.clipboard.writeText(this.code);
  }
}
