import { Component } from '@angular/core';
import { CodeComponent } from '../code/code.component';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [CodeComponent,TabsComponent],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css',
})
export class DeveloperComponent {

  
    code1: string = `{
        clientID: string,
        clientSECRET: string
    }`
    
        code2: string = `{
        callbackUrl: string
    }`
    
        code3: string = `{
        authCode: string,
        codeVerifier: string
    }`
    
        code4: string = `{
        Auth_token: string
    }`
    
        code5: string = `{
        token: string
    }`
    
        code6: string = `{
        AuthCode: string,
        CodeVerifier: string
    }`
        
}


