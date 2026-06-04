import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let cloneReq = req;
  
  // Prepend Base URL for relative paths
  if (req.url.startsWith('/')) {
    cloneReq = req.clone({
      url: `${environment.apiUrl}${req.url}`
    });
  }

  return next(cloneReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado.';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error del cliente: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 404:
            errorMessage = 'El recurso solicitado no fue encontrado (404).';
            break;
          case 500:
            errorMessage = 'Error interno del servidor (500). Inténtalo más tarde.';
            break;
          case 0:
            errorMessage = 'No hay conexión con el servidor. Verifica tu internet.';
            break;
          default:
            errorMessage = `Error del servidor (${error.status}): ${error.message}`;
        }
      }
      
      console.error('Interceptor de Errores:', errorMessage, error);
      // We return the error wrapped in a custom structure or re-throw
      return throwError(() => new Error(errorMessage));
    })
  );
};
