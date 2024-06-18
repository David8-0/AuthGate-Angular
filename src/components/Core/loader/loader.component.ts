import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit,OnDestroy{
  isLoading:boolean = false;
  sub:Subscription = new Subscription();
  constructor(private _loaderService:LoaderService){}

  ngOnInit(): void {
      this.sub = this._loaderService.loading.subscribe(loader=>{
        this.isLoading = loader;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
