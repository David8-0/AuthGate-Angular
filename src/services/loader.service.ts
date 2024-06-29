import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public _globalLoaderCounter:number = 0;
  public loading: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor() { }
  setLoader(show: boolean) {
    if (show) {
      this._globalLoaderCounter++;
      
    } else if(this._globalLoaderCounter>0) {
      this._globalLoaderCounter--;
    }
    
    if(this._globalLoaderCounter>0 && !this.loading.value){
      this.loading.next(true);
    } else if(this._globalLoaderCounter==0 && this.loading.value){
     this.loading.next(false);
    }
    console.log(this._globalLoaderCounter,this.loading.value);

  }
}
