import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { AuthenticationService } from '../../../services/authentication.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  user:User= {};
  sub:Subscription = {} as Subscription;
  constructor(private _authenticationService:AuthenticationService){}

  ngOnInit(): void {
      this._authenticationService.user.subscribe(newUser =>this.user = newUser);
  }
}
