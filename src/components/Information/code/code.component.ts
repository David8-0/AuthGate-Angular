import { Component, Input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [TooltipModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  @Input() code: string="";

  copyCode(){
    navigator.clipboard.writeText(this.code);
  }

}
