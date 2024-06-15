import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  let token:string =`${localStorage.getItem("token")}`;
  let modifiedRequest = req.clone({
    headers: req.headers.set("authorization", `Bearer ${token}`)
  }) 
  return next(modifiedRequest);
};
