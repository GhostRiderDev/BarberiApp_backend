import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { password } = request.body;

    if (password) {
      return from(bcrypt.hash(password, 10)).pipe(
        switchMap((hashedPassword) => {
          request.body.password = hashedPassword;
          return next.handle();
        }),
      );
    }
    return next.handle();
  }
}
