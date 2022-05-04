  
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        // tslint:disable-next-line: max-line-length
        Authorization: `Bearer ${'eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJmamVyYmkiLCJpYXQiOjE2MTIyODEyNDQsImV4cCI6MTYxMjI4NDg0NH0.WJ_4-d-qKK6-B0ZWi1qnHHbh1tQ43LcqhGtvwTiJkBhoZsWLDm-qSAi9UHmmTT-iuiuK4XNI7GQNOL167kd8NMKuqlMgOVPOb7z4xtG1DzirNX4W2SWBi5SDGkCPKWu0tubtv5p-yOiZUpwhQhXOScx52rwevS5zA8oKUSx0Ewmb27OJV16XiThiUiNjdrqnBqCWmWC5onUH_MaenCtTnbVPUkoD-yI11jE2KgvvHPgdlU8DsRI369ONsTyPhH7rHcehIdXhPAYX2wZj2IR8jB7_QxdxXoPAs9YujUIqnKq4hPeG1UD8mrf-mFurlF7uVQdpqKgsWi7k517V6y6gZOxYgthFp-AdpAxoiaS1UFlotDnLC8gd37mISunaMmUl9bhICTcLICA0ndMHQ0oOKxtH8BGIxsDrRwSz_ZexmdF_laC2NF9A937PBWBMQOp1PNmrn8Prd6qdOguNTbk90UYqI58egnUJcCHRVnDfiXVyKsH9asklxCRD1MhW80JfJ5407Y2n26IggbQvnvyqMaacwVXsZ5mJ2kBCbAYw8DPeuRqBUA6ryx_5NGwYUuE8wW2CgVyWEYzbi3SKvuQ71HRMUrI60xieofw5zV780HxzrmeDY4Q9GYBnUWUw-HikutWXgXUMJ7AD1FhvUMJarG2PA_jaz2ym0cQ79GhMLeI'}`
      }
    });
    return next.handle(request);
  }
}