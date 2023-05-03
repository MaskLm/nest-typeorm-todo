import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ForeignKeyConstraintInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.code === '23503') {
          const message = 'foreign key violation';
          throw new HttpException(message, HttpStatus.BAD_REQUEST);
        } else {
          throw error;
        }
      }),
    );
  }
}
