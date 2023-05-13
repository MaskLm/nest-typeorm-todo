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
export class UniqueConstraintInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.code === '23505') {
          let message = 'Unique constraint violation';
          if (error.constraint === 'UQ_USER_USERNAME') {
            message = 'Username already exists';
          } else if (error.constraint === 'UQ_USER_EMAIL') {
            message = 'Email already exists';
          }
          throw new HttpException(message, HttpStatus.BAD_REQUEST);
        } else {
          throw error;
        }
      }),
    );
  }
}
