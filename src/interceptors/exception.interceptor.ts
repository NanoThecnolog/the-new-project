import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, InternalServerErrorException } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof HttpException) {
                    return throwError(() => error);
                }

                console.error('Erro desconhecido:', error);

                return throwError(
                    () => new InternalServerErrorException('Erro interno do servidor'),
                );
            }),
        );
    }
}
