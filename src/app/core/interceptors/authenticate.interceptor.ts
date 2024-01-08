import { HttpInterceptorFn } from '@angular/common/http';

export const authenticateInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
