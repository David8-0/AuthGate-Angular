import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const _loader = inject(LoaderService);
  _loader.setLoader(true);
  let token:string =`${localStorage.getItem("token")}`;
  let modifiedRequest = req.clone({
    headers: req.headers.set("authorization", `Bearer ${token}`)
  }) 
  console.log(req);
  
  return next(modifiedRequest).pipe(
    finalize(()=>{
      _loader.setLoader(false);
    })
  )
};
